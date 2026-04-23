import { normalizePhoneForSubmit } from '@/lib/phone'

const WEBHOOK_URLS = [
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/cf2eced9-14ad-4109-ba4f-fd244858af10',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/REPLACE-WITH-COMPLIANCE-WEBHOOK-UUID',
]

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message, smsUpdates, smsPromo } = body

    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      type: 'Contact_Form',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: normalizePhoneForSubmit(phone),
      message: message.trim(),
      sms_updates: smsUpdates ? 'Yes' : 'No',
      sms_promo: smsPromo ? 'Yes' : 'No',
      source: 'src_contact',
      submitted_at: new Date().toISOString(),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error('[api/contact] webhook error:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return Response.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('[api/contact]:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
