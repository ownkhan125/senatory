import { normalizePhoneForSubmit } from '@/lib/phone'

const WEBHOOK_URLS = [
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/23834100-4e00-4579-82e7-f9ec69ed8542',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/df947411-0c7e-4a6c-8c2e-7f20291c333f',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/19e7758c-f5c5-44fa-a770-5c18cefa0645',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/REPLACE-WITH-COMPLIANCE-WEBHOOK-UUID',
]

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      zipCode,
      county,
      region,
      registeredVoter,
      campaignExperience,
      helpOptions,
      availability,
      issues,
      anythingElse,
      smsUpdates,
      smsPromo,
    } = body

    if (!firstName?.trim() || !lastName?.trim() || !email?.trim()) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = {
      type: 'Volunteer_Form',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: normalizePhoneForSubmit(phone),
      zipCode: zipCode?.trim() ?? '',
      county: county ?? '',
      region: region ?? '',
      registeredVoter: registeredVoter ?? '',
      campaignExperience: campaignExperience ?? '',
      helpOptions: Array.isArray(helpOptions)
        ? helpOptions.join(', ')
        : (helpOptions ?? ''),
      availability: availability ?? '',
      issues: issues?.trim() ?? '',
      anythingElse: anythingElse?.trim() ?? '',
      sms_updates: smsUpdates ? 'Yes' : 'No',
      sms_promo: smsPromo ? 'Yes' : 'No',
      source: 'src_volunteer',
      submitted_at: new Date().toISOString(),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error('[api/volunteer] webhook error:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return Response.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('[api/volunteer]:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
