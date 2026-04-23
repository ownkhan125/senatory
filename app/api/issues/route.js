import { normalizePhoneForSubmit } from '@/lib/phone'

const WEBHOOK_URLS = [
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/3c2d23be-00aa-49d5-9d14-6597d2e93123',
  'https://services.leadconnectorhq.com/hooks/HK7KWJYbw33yisOBMGEO/webhook-trigger/REPLACE-WITH-COMPLIANCE-WEBHOOK-UUID',
]

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      category,
      location,
      subject,
      description,
      smsUpdates,
      smsPromo,
    } = body

    if (
      !name?.trim() ||
      !email?.trim() ||
      !subject?.trim() ||
      !description?.trim()
    ) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || ''

    const payload = {
      type: 'Issue_Report',
      firstName,
      lastName,
      email: email.trim(),
      phone: normalizePhoneForSubmit(phone),
      issue_category: category ?? '',
      issue_location: location?.trim() ?? '',
      issue_subject: subject.trim(),
      issue_description: description.trim(),
      issue_image: '',
      sms_updates: smsUpdates ? 'Yes' : 'No',
      sms_promo: smsPromo ? 'Yes' : 'No',
      source: 'src_issue',
      submitted_at: new Date().toISOString(),
    }

    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error('[api/issues] webhook error:', err)
          return { ok: false }
        })
      )
    )

    if (!results.some((r) => r.ok)) {
      return Response.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('[api/issues]:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
