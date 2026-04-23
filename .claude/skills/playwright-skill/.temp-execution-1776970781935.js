const { chromium } = require('playwright');

const BASE = 'http://localhost:3002';
const ORG = 'Senator Campaign Committee';

const results = [];
const log = (ok, msg) => { results.push({ ok, msg }); console.log(`${ok ? 'PASS' : 'FAIL'} — ${msg}`); };

async function checkFooter(page, pageName) {
  const footerText = await page.locator('footer').evaluate((el) => el.textContent);
  log(/Senator Campaign Committee/i.test(footerText), `[${pageName}] footer contains legal name`);
  log(/Privacy Policy/i.test(footerText), `[${pageName}] footer has Privacy Policy link`);
  log(/Terms of Service/i.test(footerText), `[${pageName}] footer has Terms of Service link`);
  log(/\(503\)\s?555-0100/.test(footerText), `[${pageName}] footer has phone`);
  log(/contact@senatorycampaign\.com/i.test(footerText), `[${pageName}] footer has email`);
  log(/1200 SW Main St/i.test(footerText), `[${pageName}] footer has physical address`);
  log(/©\s?2026/.test(footerText), `[${pageName}] footer has copyright`);
}

async function checkConsentCheckboxes(page, formName) {
  await page.waitForTimeout(400);
  const boxes = await page.locator('form input[type="checkbox"][id=""], form input[type="checkbox"]:not([id])').all();
  const formHtml = await page.locator('form').first().innerHTML();
  const text = await page.locator('form').first().innerText();

  const infoOk = new RegExp(`I agree to receive SMS updates from ${ORG}`).test(text);
  const promoOk = new RegExp(`I agree to receive promotional SMS messages from ${ORG}`).test(text);
  log(infoOk, `[${formName}] informational checkbox names "${ORG}"`);
  log(promoOk, `[${formName}] promotional checkbox names "${ORG}"`);
  log(/Reply STOP to unsubscribe or HELP for help/i.test(text), `[${formName}] consent has STOP + HELP`);
  log(/Message frequency varies/i.test(text), `[${formName}] consent has frequency disclosure`);
  log(/Message &? ?data rates may apply|Message & data rates may apply/i.test(text), `[${formName}] consent has data-rates disclosure`);

  // Verify checkboxes are below the submit button in DOM ordering? Actually above submit.
  const form = await page.locator('form').first();
  const submitBtn = await form.locator('button[type="submit"]').first();
  const submitBox = await submitBtn.boundingBox();
  const smsCheckboxes = await form.locator('input[type="checkbox"]').all();
  let allAbove = true;
  for (const cb of smsCheckboxes) {
    const cbBox = await cb.boundingBox();
    if (cbBox && submitBox && cbBox.y >= submitBox.y) {
      // Some forms have other checkboxes (volunteer skills). We care about the SMS ones — rely on text match.
    }
  }

  // Find the sms checkboxes specifically by matching label text
  const smsInfoCheckbox = await page.locator('label:has-text("receive SMS updates from Senator") input[type="checkbox"]').first();
  const smsPromoCheckbox = await page.locator('label:has-text("receive promotional SMS messages from Senator") input[type="checkbox"]').first();

  const smsInfoChecked = await smsInfoCheckbox.isChecked().catch(() => null);
  const smsPromoChecked = await smsPromoCheckbox.isChecked().catch(() => null);
  log(smsInfoChecked === false, `[${formName}] informational checkbox NOT pre-checked`);
  log(smsPromoChecked === false, `[${formName}] promotional checkbox NOT pre-checked`);

  const smsInfoRequired = await smsInfoCheckbox.evaluate((el) => el.required).catch(() => null);
  const smsPromoRequired = await smsPromoCheckbox.evaluate((el) => el.required).catch(() => null);
  log(smsInfoRequired === false, `[${formName}] informational checkbox is OPTIONAL (not required)`);
  log(smsPromoRequired === false, `[${formName}] promotional checkbox is OPTIONAL (not required)`);

  // Order: both checkboxes above submit
  const infoBox = await smsInfoCheckbox.boundingBox();
  const promoBox = await smsPromoCheckbox.boundingBox();
  if (infoBox && promoBox && submitBox) {
    log(infoBox.y < submitBox.y, `[${formName}] informational checkbox is ABOVE submit button`);
    log(promoBox.y < submitBox.y, `[${formName}] promotional checkbox is ABOVE submit button`);
  }
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // 1. Home
  console.log('\n=== Home ===');
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
  await checkFooter(page, 'Home');

  // 2. Privacy Policy
  console.log('\n=== Privacy Policy ===');
  await page.goto(`${BASE}/privacy-policy`, { waitUntil: 'networkidle' });
  const ppTitle = await page.title();
  log(/Privacy Policy/.test(ppTitle), `Privacy Policy page loads (not 404), title="${ppTitle}"`);
  const ppText = await page.locator('main').innerText();
  log(new RegExp(ORG).test(ppText), 'Privacy Policy contains legal business name');
  log(/SMS|Text Messaging/i.test(ppText), 'Privacy Policy has SMS section');
  log(/We will not share or sell your text messaging opt-in data, consent, or related personal information with any third parties, unless required by law/i.test(ppText), 'Privacy Policy has explicit no-share/no-sell SMS statement');
  log(/What Phone Numbers Are Collected For|phone numbers are collected/i.test(ppText), 'Privacy Policy explains what phone numbers collected for');
  log(/How Your Phone Number Is Used for SMS/i.test(ppText), 'Privacy Policy explains SMS usage');
  log(/Types of Messages/i.test(ppText), 'Privacy Policy lists types of messages');
  log(/How Long Phone Number and Consent Data Is Retained|retention/i.test(ppText), 'Privacy Policy covers retention');
  log(/How You Can Request Data Deletion|request deletion/i.test(ppText), 'Privacy Policy covers deletion requests');
  log(/Reply STOP/i.test(ppText), 'Privacy Policy has STOP opt-out');
  await checkFooter(page, 'Privacy Policy');

  // 3. Terms of Service
  console.log('\n=== Terms of Service ===');
  await page.goto(`${BASE}/terms-of-service`, { waitUntil: 'networkidle' });
  const tosTitle = await page.title();
  log(/Terms of Service/.test(tosTitle), `Terms of Service page loads (not 404), title="${tosTitle}"`);
  const tosText = await page.locator('main').innerText();
  log(new RegExp(ORG).test(tosText), 'TOS contains legal business name');
  log(/Program Name and Description/i.test(tosText), 'TOS has program description (element 1)');
  log(/text STOP to the shortcode|Reply STOP/i.test(tosText), 'TOS has STOP instructions (element 2)');
  log(/keyword HELP|reply.*HELP/i.test(tosText), 'TOS has HELP keyword instructions (element 3)');
  log(/Carriers are not liable for delayed or undelivered messages/i.test(tosText), 'TOS has carrier liability disclaimer (element 4)');
  log(/message and data rates may apply.*Message frequency varies|message and data rates.*frequency/is.test(tosText), 'TOS has data rates + frequency (element 5)');
  log(/privacy policy/i.test(tosText), 'TOS has Privacy Policy link (element 6)');
  await checkFooter(page, 'TOS');

  // 4. Contact page — check form + contact info
  console.log('\n=== Contact ===');
  await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
  const contactText = await page.locator('main').innerText();
  log(/\+1\s?\(503\)\s?555-0100/.test(contactText), 'Contact page shows phone number');
  log(/contact@senatorycampaign\.com/.test(contactText), 'Contact page shows email');
  log(/1200 SW Main St/.test(contactText), 'Contact page shows address');
  log(new RegExp(ORG).test(contactText), 'Contact page shows legal business name');

  // Fill phone to enable checkboxes for interaction check
  await page.fill('#cf_phone', '503-555-0101');
  await checkConsentCheckboxes(page, 'Contact form');
  await checkFooter(page, 'Contact');

  // 5. Volunteer form
  console.log('\n=== Volunteer ===');
  await page.goto(`${BASE}/volunteer`, { waitUntil: 'networkidle' });
  await page.fill('#vf_phone', '503-555-0101');
  await checkConsentCheckboxes(page, 'Volunteer form');
  await checkFooter(page, 'Volunteer');

  // 6. Ask form
  console.log('\n=== Ask ===');
  await page.goto(`${BASE}/ask`, { waitUntil: 'networkidle' });
  await page.fill('#af_phone', '503-555-0101');
  await checkConsentCheckboxes(page, 'Ask form');
  await checkFooter(page, 'Ask');

  // 7. Event RSVP (on an event detail page — navigate via events list)
  console.log('\n=== Events list + RSVP ===');
  await page.goto(`${BASE}/events`, { waitUntil: 'networkidle' });
  await checkFooter(page, 'Events list');
  const firstRsvpLink = await page.locator('a:has-text("RSVP")').first();
  if (await firstRsvpLink.count()) {
    await firstRsvpLink.click();
    await page.waitForLoadState('networkidle');
    await page.fill('#rsvp_phone', '503-555-0101').catch(() => {});
    await checkConsentCheckboxes(page, 'Event RSVP form');
    await checkFooter(page, 'Event detail');
  } else {
    log(false, 'Could not find an event RSVP link to test');
  }

  // Summary
  const pass = results.filter((r) => r.ok).length;
  const fail = results.filter((r) => !r.ok).length;
  console.log(`\n\n========== SUMMARY ==========`);
  console.log(`PASSED: ${pass}`);
  console.log(`FAILED: ${fail}`);
  if (fail > 0) {
    console.log(`\nFAILURES:`);
    results.filter((r) => !r.ok).forEach((r) => console.log(`  - ${r.msg}`));
  }

  await browser.close();
  process.exit(fail > 0 ? 1 : 0);
})();
