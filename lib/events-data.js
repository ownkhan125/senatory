export const events = [
  {
    slug: "town-hall-portland",
    day: "28",
    month: "Apr",
    dateLong: "Monday, April 28, 2026",
    title: "Town Hall: Jobs & the Economy",
    tag: "Town Hall",
    location: "Oregon Convention Center, Portland",
    address: "777 NE Martin Luther King Jr Blvd, Portland, OR 97232",
    time: "6:00 PM — 8:30 PM PT",
    summary:
      "An open forum where you ask the questions and we answer them — directly, honestly. No scripts, no filters. These are your concerns, and they deserve real answers.",
    whatToExpect: [
      "Opening remarks from the candidate (15 minutes)",
      "Moderated Q&A with community members — bring your questions",
      "One-on-one conversations after the forum over light refreshments",
      "Volunteer sign-up table near the entrance",
    ],
  },
  {
    slug: "community-mic-psu",
    day: "05",
    month: "May",
    dateLong: "Tuesday, May 5, 2026",
    title: "Community Mic: Education",
    tag: "Community Mic",
    location: "Portland State University, Portland",
    address: "1825 SW Broadway, Portland, OR 97201",
    time: "4:00 PM — 6:00 PM PT",
    summary:
      "Join us for a focused conversation on K-12 and higher education — parental authority, teacher freedom, equal funding, and real reform.",
    whatToExpect: [
      "Panel with local teachers and parents",
      "Live Q&A and written-card questions",
      "Policy brief handout on federal education priorities",
      "Coffee and light snacks provided",
    ],
  },
  {
    slug: "community-walk-salem",
    day: "14",
    month: "May",
    dateLong: "Thursday, May 14, 2026",
    title: "Community Walk & Volunteer Drive",
    tag: "Volunteer Drive",
    location: "Salem Civic Center, Salem",
    address: "555 Liberty St SE, Salem, OR 97301",
    time: "9:00 AM — 12:00 PM PT",
    summary:
      "A morning of neighborhood canvassing followed by a volunteer kickoff brunch. Bring comfortable shoes, friends, and a few hours.",
    whatToExpect: [
      "Canvassing teams dispatched at 9:30 AM",
      "Walk sheets, scripts, and t-shirts provided",
      "Return for a debrief brunch at 11:30 AM",
      "Open to all skill levels — training on-site",
    ],
  },
];

export function getEventBySlug(slug) {
  return events.find((e) => e.slug === slug) || null;
}
