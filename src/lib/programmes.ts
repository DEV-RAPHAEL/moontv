export type Programme = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  gallery: string[];
  synopsis: string;
  identity: string;
  purpose: string[];
  audience: string[];
  format: string;
  personality: string;
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
    identity:
      "A vibrant, character-driven drama series with strong comedic undertones. It blends generational satire with contemporary urban culture, using the contrast between age and attitude to create warm family tension.",
    purpose: [
      "Challenge stereotypes about aging and what it means to grow old.",
      "Flip the generational gap by making the children parent their youthful parents.",
      "Explore the influence of social media and digital culture across age groups.",
      "Use humor to discuss respect, responsibility, image, and authenticity.",
    ],
    audience: [
      "Ages 12-85",
      "Social media users familiar with online trends and influencer culture",
      "Fans of family dramedy with a comedic edge",
    ],
    format:
      "A high-spirited family drama series based on the on-goings of the Brainard household, grounded in heartfelt family connections and generational role reversals.",
    personality:
      "Playful, energetic, colorful, and loud, with fast-paced dialogue, trendy slang, exaggerated situations, and genuine affection beneath the comedy.",
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
    identity:
      "A culturally rich culinary lifestyle show built on storytelling through food, Nigerian culinary techniques, culture, history, and creative interpretation.",
    purpose: [
      "Celebrate and preserve culture through food.",
      "Showcase the diversity of Nigerian cuisine and its global influences.",
      "Highlight the stories, origins, traditions, and meanings behind dishes.",
      "Encourage cultural pride and appreciation among younger generations.",
    ],
    audience: [
      "All ages",
      "Culture and lifestyle enthusiasts",
      "Home cooks, food lovers, and viewers curious about Nigerian and African cuisine",
    ],
    format:
      "A studio-based culinary show featuring a host and guest chef who prepare Nigerian dishes while explaining their cultural relevance.",
    personality:
      "Expressive, culture-forward, proudly African, globally relevant, and built around the idea that every plate tells a deeper story.",
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
    identity:
      "A compelling half-hour family drama designed to entertain while delivering strong moral and social messages through relatable family-centered narratives.",
    purpose: [
      "Address moral decadence through storytelling.",
      "Reintroduce quality family-friendly programming.",
      "Highlight relationships between adults and children.",
      "Promote respect, integrity, responsibility, and accountability.",
    ],
    audience: [
      "All ages",
      "Households looking for wholesome family entertainment",
      "Viewers interested in socially conscious storytelling",
    ],
    format:
      "A family drama series built around relatable everyday situations within the family, school, and wider society.",
    personality:
      "Thought-provoking and emotionally engaging, raising moral questions with empathy, patience, and social awareness.",
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
    identity:
      "An anthology-style drama series that uncovers hidden layers of its characters through self-contained narratives such as Silent Tears, The Cross, Soul to Soul, The Unveiling, and The Brief.",
    purpose: [
      "Uncover hidden emotional and moral struggles.",
      "Examine trust and betrayal in personal and corporate relationships.",
      "Highlight workplace inequality, ambition, and ethical compromise.",
      "Show the emotional realities behind success and power.",
    ],
    audience: [
      "Ages 18-85",
      "Viewers who relate to ambition, workplace politics, and relationship struggles",
      "Fans of romantic dramas with depth and realism",
    ],
    format:
      "An anthology framework where each iteration tells a distinct story with unique characters, unified by recurring themes and emotional depth.",
    personality:
      "Gripping, emotionally layered, romantic yet realistic, and tense with secrets, betrayal, workplace politics, and tested trust.",
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
    identity:
      "A compelling Nigerian family drama rooted in culturally relevant storytelling, relationship complexity, legacy, and societal expectations.",
    purpose: [
      "Promote strong family values through entertainment.",
      "Encourage unity, responsibility, and moral integrity.",
      "Spark conversations around inheritance, class differences, and generational conflict.",
      "Highlight the consequences of greed, betrayal, and unresolved wounds.",
    ],
    audience: [
      "Ages 12-85",
      "Family-oriented viewers",
      "Viewers interested in suspense, drama, and romance",
    ],
    format:
      "Serialized storytelling with interconnected plotlines centered on family, class tension, inheritance, ambition, and loyalty.",
    personality:
      "Emotional, intense, suspenseful, and relatable, balancing dramatic tension with warmth, humor, and reflection.",
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
    identity:
      "A vibrant food and lifestyle television program celebrating Nigerian cuisine alongside selected international dishes, connecting food with identity, heritage, and everyday living.",
    purpose: [
      "Promote Nigerian culinary heritage and preserve traditional recipes.",
      "Showcase dishes across states and ethnic groups.",
      "Introduce international cuisines in a relatable way.",
      "Educate audiences on techniques, ingredients, and presentation.",
    ],
    audience: [
      "All ages",
      "Home cooks and food enthusiasts",
      "Viewers interested in traditional meal ideas, travel, and culture",
      "Diaspora audiences seeking connection to Nigerian cuisine",
    ],
    format:
      "An episodic cooking, lifestyle, and cultural exploration format focused on dish origins, ingredients, preparation, and practical tips.",
    personality:
      "Homely, welcoming, culturally rich, authentic, and deeply rooted in Nigerian culinary history.",
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
    identity:
      "A knowledge-driven aviation program delivering authoritative conversations about aviation policy, infrastructure, safety, regulation, and opportunity.",
    purpose: [
      "Inform viewers about developments, policies, and trends in aviation.",
      "Educate the public on how aviation impacts economic growth and connectivity.",
      "Provide a platform for industry stakeholders to share insight and solutions.",
      "Promote transparency around infrastructure, safety, and regulation.",
    ],
    audience: [
      "All ages",
      "Investors and business stakeholders interested in transport and infrastructure",
      "Viewers interested in aviation and national development",
    ],
    format:
      "A structured studio format blending one-on-one interviews, round-table conversations, and topic-focused aviation analysis.",
    personality:
      "Credible, professional, accessible, clear, and discussion-led without becoming overly technical.",
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
    identity:
      "A vibrant studio-based talk program that blends breakfast conversation warmth with sharp industry-focused analysis and thought leadership.",
    purpose: [
      "Inform viewers about trends and disruptions in aviation, tourism, and travel.",
      "Analyze policy changes and operational challenges.",
      "Break down complex topics into accessible discussion.",
      "Inspire innovation and collaboration across mobility sectors.",
    ],
    audience: [
      "All ages",
      "Viewers interested in aviation, tourism, and travel",
      "Business investors and entrepreneurs exploring mobility and tourism",
      "Travel enthusiasts and informed viewers",
    ],
    format:
      "A trio-led studio program with balanced viewpoints, healthy debate, guest insights, and topics across mobility, tourism, destination branding, and travel policy.",
    personality:
      "Conversational, relaxed, energetic, research-grounded, accessible, and driven by host chemistry.",
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
    identity:
      "A studio-based talk show centered on empowering women through honest conversations, shared experiences, personal storytelling, and expert insight.",
    purpose: [
      "Empower women with knowledge, tools, and resources.",
      "Provide a platform for women to share views and experiences.",
      "Educate on marriage, family, career, health, and personal growth.",
      "Encourage community, support, and positive change.",
    ],
    audience: [
      "Ages 18-85",
      "Married women and women in relationships",
      "Mothers, caregivers, young women, and professionals",
      "Families and partners interested in women's perspectives",
    ],
    format:
      "A concise, discussion-led format with a host, guests, expert insight, real-life experiences, and practical advice.",
    personality:
      "Warm, empathetic, authentic, relatable, empowering, uplifting, and grounded in real-life journeys.",
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
    identity:
      "A pioneering multi-platform health and lifestyle program known for credible health information and practical wellness guidance.",
    purpose: [
      "Promote healthy living through practical everyday knowledge.",
      "Educate the public on preventive care and lifestyle choices.",
      "Simplify medical information for general audiences.",
      "Encourage proactive health management and informed decisions.",
    ],
    audience: [
      "Ages 13-85",
      "Health-conscious individuals",
      "Viewers interested in beauty, fitness, personal care, and wellness",
      "Patients and general viewers seeking simplified expert explanations",
    ],
    format:
      "A segmented magazine-style format with health, beauty, lifestyle, expert features, short tips, and practical wellness advice.",
    personality:
      "Credible, expert-backed, practical, solution-oriented, accessible, and focused on everyday wellness needs.",
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
    identity:
      "A vibrant, youth-forward entertainment and lifestyle show positioned as a fast-paced hub for films, music, cars, and culture.",
    purpose: [
      "Inform viewers about entertainment, lifestyle, and culture.",
      "Entertain through snackable, visually dynamic content.",
      "Connect audiences to Nollywood, global entertainment, and pop culture trends.",
      "Keep viewers updated, inspired, and culturally aware.",
    ],
    audience: [
      "Ages 13-85",
      "Urban viewers interested in entertainment, lifestyle, and trends",
      "Social media-savvy pop culture fans",
      "Car enthusiasts looking for practical insights",
    ],
    format:
      "A magazine-style format with recurring segments including Filmlab, Carhub, and Culture Update.",
    personality:
      "Energetic, current, urban, relatable, informative, fun, and plugged into pop culture.",
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
    identity:
      "A bold, socially relevant family drama anthology that reinvents itself each season while reflecting the hopes, conflicts, and aspirations of everyday people.",
    purpose: [
      "Tell relatable human stories rooted in real-world experiences.",
      "Spark conversations around social norms, gender roles, ambition, and family dynamics.",
      "Challenge stereotypes and encourage open-minded perspectives.",
      "Entertain through emotional, high-stakes drama.",
    ],
    audience: [
      "Ages 18-85",
      "Fans of drama series with emotional and social themes",
      "Family audiences who enjoy serialized storytelling",
      "Viewers interested in relationship dynamics, ambition, and societal pressure",
    ],
    format:
      "A seasonal anthology where each season has a self-contained story arc, fresh characters, and themes blending drama, suspense, action, and emotional conflict.",
    personality:
      "Bold, progressive, conversation-starting, grounded, emotionally intense, and invested in challenging social expectations.",
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
    identity:
      "A youth-centered entertainment program designed to spotlight the creativity, intelligence, and individuality of children under 16.",
    purpose: [
      "Nurture self-expression and showcase children's talents.",
      "Build confidence and communication skills.",
      "Encourage creativity, critical thinking, and originality.",
      "Provide visibility for emerging young talent on a global scale.",
    ],
    audience: [
      "Ages 5-18",
      "Parents, guardians, and educators",
      "General viewers who enjoy inspirational, family-friendly entertainment",
      "International audiences interested in young talent",
    ],
    format:
      "A bright, age-appropriate showcase with featured participants, talent displays, free-expression segments, fun challenges, and positive mentorship.",
    personality:
      "Vibrant, uplifting, inclusive, energetic, fun, encouraging, and focused on growth rather than competition.",
  },
  {
    id: 14,
    slug: "mothers-world",
    title: "Mothers World",
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
      "A guide to motherhood, bonding with children, healthy diets, and healthy living through segments on meals and maternal wellness.",
    identity:
      "A lifestyle and wellness program supporting mothers through nutrition, motherhood guidance, emotional support, and practical family health advice.",
    purpose: [
      "Empower mothers with knowledge and confidence.",
      "Promote healthy eating habits for families.",
      "Provide reliable guidance on pre- and postnatal care.",
      "Encourage balanced lifestyles that support physical and mental health.",
    ],
    audience: [
      "Ages 18-85",
      "Expecting mothers, new mothers, and mothers with young children",
      "Health-conscious families",
      "Modern mothers seeking balance between caregiving and personal wellness",
    ],
    format:
      "A practical format built around Healthy Meals and Motherhood segments, combining recipe demonstrations with expert-led maternal and parenting discussions.",
    personality:
      "Warm, nurturing, reassuring, supportive, empathetic, judgment-free, and focused on real-life solutions.",
  },
];

export const programmeCategories = [
  "ALL",
  ...Array.from(new Set(programmes.map((programme) => programme.category))),
];

export function getProgrammeBySlug(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}
