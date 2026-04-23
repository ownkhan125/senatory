import { normalizePhoneForSubmit } from '@/lib/phone'

const WEBHOOK_URLS = [
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/b8b53720-18c4-4cde-9db9-c549de6264ee',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/REPLACE-WITH-COMPLIANCE-WEBHOOK-UUID',
]

const GHL_API_BASE = 'https://services.leadconnectorhq.com'
const GHL_CALENDAR_ID = 'UTM5EkrGwiZjQyc19WGN'
const GHL_API_VERSION = '2021-07-28'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const parseStartTime = (dateLong, time) => {
  try {
    const startTimeStr = (time?.split('—')[0] ?? time?.split('–')[0] ?? time ?? '').trim()
    const timeMatch = startTimeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    const date = new Date(dateLong)
    if (!timeMatch || Number.isNaN(date.getTime())) return null
    let hours = parseInt(timeMatch[1], 10)
    const minutes = parseInt(timeMatch[2], 10)
    const period = timeMatch[3].toUpperCase()
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    date.setHours(hours, minutes, 0, 0)
    return date.toISOString()
  } catch {
    return null
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      eventName,
      eventDate,
      eventTime,
      eventCategory,
      smsUpdates,
      smsPromo,
    } = body

    if (!firstName?.trim() || !email?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      type: 'Event_RSVP',
      firstName: firstName.trim(),
      lastName: lastName?.trim() ?? '',
      email: email.trim(),
      phone: normalizePhoneForSubmit(phone),
      eventName: eventName ?? '',
      eventDate: eventDate ?? '',
      eventTime: eventTime ?? '',
      eventCategory: eventCategory ?? '',
      sms_updates: smsUpdates ? 'Yes' : 'No',
      sms_promo: smsPromo ? 'Yes' : 'No',
      source: 'src_event',
      submitted_at: new Date().toISOString(),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error('[api/events/rsvp] webhook error:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return Response.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    let contactId = null

    const locationId = process.env.GHL_LOCATION_ID
    const apiToken = process.env.GHL_API_KEY ?? process.env.GHL_API_TOKEN

    if (locationId && apiToken) {
      try {
        await sleep(2000)

        const searchResponse = await fetch(
          `${GHL_API_BASE}/contacts/search/duplicate?locationId=${locationId}&email=${encodeURIComponent(email.trim())}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${apiToken}`,
              Version: GHL_API_VERSION,
            },
          }
        )

        if (searchResponse.ok) {
          const searchData = await searchResponse.json()
          contactId = searchData?.contact?.id ?? null
        }

        if (contactId) {
          const startTime = parseStartTime(eventDate, eventTime)
          const endTime = startTime
            ? new Date(new Date(startTime).getTime() + 60 * 60 * 1000).toISOString()
            : null

          if (startTime && endTime) {
            await fetch(`${GHL_API_BASE}/calendars/events/appointments`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiToken}`,
                Version: GHL_API_VERSION,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                calendarId: GHL_CALENDAR_ID,
                locationId,
                contactId,
                title: `RSVP: ${eventName}`,
                appointmentStatus: 'confirmed',
                startTime,
                endTime,
                timezone: 'America/Los_Angeles',
                notes: 'RSVP submitted via campaign website',
              }),
            })
          }
        }
      } catch (error) {
        console.error('[api/events/rsvp] GHL follow-up error:', error)
      }
    }

    return Response.json({ success: true, contactId })
  } catch (error) {
    console.error('[api/events/rsvp]:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
