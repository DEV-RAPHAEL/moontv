export type Programme = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  synopsis: string;
  notableCast: string[];
};

const batchRoot = "/Moon TV Program Details - Batch 1";

export const programmes: Programme[] = [
  {
    id: 1,
    slug: "down-town",
    title: "Down Town",
    category: "DRAMA SERIES",
    image: `${batchRoot}/Down Town/Down Town Images/Down Town - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 6.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 7.png`,
      `/Moon TV Program Details - Batch 1/Down Town/Down Town Images/Down Town - Image 8.png`,
    ],
    synopsis:
      "A hilarious story of Sir and Ma Brainard, a couple in their early sixties who live with the slang, fashion, social media habits, and energy of people in their twenties.",
    notableCast: ["Sir Brainard", "Ma Brainard"],
  },
  {
    id: 2,
    slug: "kilanse",
    title: "Kilanse",
    category: "CULINARY LIFESTYLE SHOW",
    image: `${batchRoot}/Kilanse/Kilanse - Images/Kilanse - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 6.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 7.png`,
      `/Moon TV Program Details - Batch 1/Kilanse/Kilanse - Images/Kilanse - Image 8.png`,
    ],
    synopsis:
      "A vibrant culinary journey through the rich, diverse cuisine of Nigeria and beyond. Kilanse does not just prepare meals; it celebrates culture.",
    notableCast: [],
  },
  {
    id: 3,
    slug: "tomorrow-is-now",
    title: "Tomorrow Is Now",
    category: "FAMILY DRAMA SERIES",
    image: `${batchRoot}/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 6.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 7.png`,
      `/Moon TV Program Details - Batch 1/Tomorrow is Now - Season 1/Tomorrow is Now - Images/Tomorrow is Now - Image 8.png`,
    ],
    synopsis:
      "An entertaining, educative, and mind-pulsating family drama series created to address moral decadence while maintaining the qualities of African drama.",
    notableCast: [],
  },
  {
    id: 4,
    slug: "in-my-closet",
    title: "In My Closet",
    category: "ANTHOLOGY-STYLE DRAMA SERIES",
    image: `${batchRoot}/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 1.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 2.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 3.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 4.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 5.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 6.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - Heart/Heart - Images/Hearts - Image 7.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - The Unveiling/The Unveiling - Images/The Unveiling - Image 1.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - The Unveiling/The Unveiling - Images/The Unveiling - Image 2.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - The Unveiling/The Unveiling - Images/The Unveiling - Image 3.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - The Unveiling/The Unveiling - Images/The Unveiling - Image 4.png`,
      `/Moon TV Program Details - Batch 1/In My Closet/In My Closet - The Unveiling/The Unveiling - Images/The Unveiling - Image 5.png`,
    ],
    synopsis:
      "A compilation of intriguing short stories exploring family, love, betrayal, perseverance, power, ambition, secrets, and emotional choices.",
    notableCast: ["Flora", "Jason", "Segun", "Chief Maxwell"],
  },
  {
    id: 5,
    slug: "family-heritage",
    title: "Family Heritage",
    category: "FAMILY DRAMA SERIES",
    image: `${batchRoot}/Family Heritage/Family Heritage Images/Family Heritage - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Family Heritage/Family Heritage Images/Family Heritage - Image 6.png`,
    ],
    synopsis:
      "A family drama series about love gone sour, socioeconomic class differences, frustration, inheritance struggles, and the pressure of legacy.",
    notableCast: [],
  },
  {
    id: 6,
    slug: "home-affairs-culinary-show",
    title: "Home Affairs Culinary Show",
    category: "FOOD AND LIFESTYLE TELEVISION PROGRAM",
    image: `${batchRoot}/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Home Affairs Culinary Show/Home Affairs Culinary Show Images/Home Affairs Culinary Show - Image 5.png`,
    ],
    synopsis:
      "A culinary show exploring the preparation of local and international dishes from a variety of states across Nigeria.",
    notableCast: [],
  },
  {
    id: 7,
    slug: "aviation-insights",
    title: "Aviation Insights",
    category: "STUDIO-BASED AVIATION PROGRAM",
    image: `${batchRoot}/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Aviation Insight/Aviation Insight Images/Aviation Insights - Image 5.png`,
    ],
    synopsis:
      "A studio-based program exploring the aviation industry in Nigeria and beyond through interviews, expert opinions, and analytical discussion.",
    notableCast: [],
  },
  {
    id: 8,
    slug: "breakfast-hub",
    title: "Breakfast Hub",
    category: "STUDIO-BASED TALK PROGRAM",
    image: `${batchRoot}/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Breakfast Hub/Breakfast Hub Images/Breakfast Hub - Image 5.png`,
    ],
    synopsis:
      "A dynamic talk program where three presenters dissect topical issues across aviation, tourism, and travel in a relaxed breakfast-style setting.",
    notableCast: [],
  },
  {
    id: 9,
    slug: "wives-roundtable",
    title: "Wives Roundtable",
    category: "STUDIO-BASED TALK SHOW",
    image: `${batchRoot}/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Wives Roundtable/Wives Roundtable/Wives Roundtable - Image 6.png`,
    ],
    synopsis:
      "A 30-minute talk show hosted by Amaka Chibuzo-Obi, giving women and families access to valuable information, tools, opportunities, and resources.",
    notableCast: ["Amaka Chibuzo-Obi"],
  },
  {
    id: 10,
    slug: "health-monitor",
    title: "Health Monitor",
    category: "HEALTH AND LIFESTYLE PROGRAM",
    image: `${batchRoot}/Health Monitor/Health Monitor Images/Health Monitor - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Health Monitor/Health Monitor Images/Health Monitor - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Health Monitor/Health Monitor Images/Health Monitor - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Health Monitor/Health Monitor Images/Health Monitor - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Health Monitor/Health Monitor Images/Health Monitor - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Health Monitor/Health Monitor Images/Health Monitor - Image 5.png`,
    ],
    synopsis:
      "A long-running independent health programme syndicated online, on radio, and on television, with segments that help viewers live healthier and more productive lives.",
    notableCast: [],
  },
  {
    id: 11,
    slug: "the-triple-m-show",
    title: "The Triple M Show",
    category: "ENTERTAINMENT AND LIFESTYLE SHOW",
    image: `${batchRoot}/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 1.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 2.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 3.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 4.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 5.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 6.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/The Triple M Show - Image 7.png`,
      `/Moon TV Program Details - Batch 1/The Triple M Show/The Triple M Show Images/TRipple M Logo.png`,
    ],
    synopsis:
      "A local and international entertainment magazine serving music, movies, lifestyle, social news, film reviews, car insights, and culture updates.",
    notableCast: [],
  },
  {
    id: 12,
    slug: "my-tomorrow-drama-series",
    title: "My Tomorrow Drama Series",
    category: "FAMILY DRAMA ANTHOLOGY SERIES",
    image: `${batchRoot}/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 1.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 2.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 3.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 4.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 5.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Drama Series - Image 6.png`,
      `/Moon TV Program Details - Batch 1/My Tomorrow Drama Series/My Tomorrow Drama Series/My Tomorrow Logo.png`,
    ],
    synopsis:
      "An action-packed family drama anthology centered on relatable real-world issues, with standalone 26-episode story arcs that reboot each season.",
    notableCast: [],
  },
  {
    id: 13,
    slug: "young-scholars",
    title: "Young Scholars",
    category: "YOUTH-CENTERED ENTERTAINMENT PROGRAM",
    image: `${batchRoot}/Young Scholars/Young Scholars Images/Young Scholars - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 6.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/Young Scholars - Image 7.png`,
      `/Moon TV Program Details - Batch 1/Young Scholars/Young Scholars Images/YOUNG SCHOLARS.png`,
    ],
    synopsis:
      "A top-tier entertainment platform for kids under 16, giving young people a global stage to express themselves and showcase their abilities.",
    notableCast: [],
  },
  {
    id: 14,
    slug: "mothers-world",
    title: "Mother's World",
    category: "LIFESTYLE AND WELLNESS PROGRAM",
    image: `${batchRoot}/Mothers World/Mothers World Images/Mothers World - Image 1.png`,
    gallery: [
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 1.png`,
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 2.png`,
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 3.png`,
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 4.png`,
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 5.png`,
      `/Moon TV Program Details - Batch 1/Mothers World/Mothers World Images/Mothers World - Image 6.png`,
    ],
    synopsis:
      "Mother's World guides viewers on motherhood and bonds with child and healthy living through healthy diets and living. Includes Healthy Meals, our flagship cooking segment, and expert interactive discussions on parenting and pre/post maternal concerns.",
    notableCast: [],
  },
];

export const programmeCategories = [
  "ALL",
  ...Array.from(new Set(programmes.map((programme) => programme.category))),
];

export function getProgrammeBySlug(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}
