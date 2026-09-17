const templates = {
  en: [
    "top {number} {topic} in {year}",
    "best {topic} for {audience} in {year}",
    "{topic} trends to watch in {year}",
    "how to choose {topic} for {audience}",
    "{topic} comparison guide {year}",
    "latest news about {topic} in {year}",
    "beginner guide to {topic}",
    "affordable {topic} ideas for {audience}",
    "{topic} tips and examples",
    "most popular {topic} this year"
  ],
  vi: [
    "top {number} {topic} hay nháº¥t {year}",
    "{topic} tá»‘t nháº¥t cho {audience} nÄƒm {year}",
    "xu hÆ°á»›ng {topic} Ä‘Ã¡ng chÃº Ã½ nÄƒm {year}",
    "cÃ¡ch chá»n {topic} phÃ¹ há»£p cho {audience}",
    "so sÃ¡nh {topic} má»›i nháº¥t {year}",
    "tin tá»©c má»›i vá» {topic} nÄƒm {year}",
    "hÆ°á»›ng dáº«n cÆ¡ báº£n vá» {topic}",
    "Ã½ tÆ°á»Ÿng {topic} tiáº¿t kiá»‡m cho {audience}",
    "máº¹o vÃ  vÃ­ dá»¥ vá» {topic}",
    "{topic} phá»• biáº¿n nháº¥t hiá»‡n nay"
  ]
};

const data = {
  en: {
    topic: [
      "movies",
      "science fiction movies",
      "family travel destinations",
      "AI tools",
      "healthy breakfast recipes",
      "online business ideas",
      "budget smartphones",
      "productivity apps",
      "electric cars",
      "home workout plans",
      "language learning methods",
      "cloud storage services",
      "gaming laptops",
      "digital marketing strategies",
      "Vietnam travel places"
    ],
    audience: [
      "students",
      "families",
      "beginners",
      "small businesses",
      "travelers",
      "remote workers",
      "content creators",
      "parents"
    ]
  },
  vi: {
    topic: [
      "phim Ä‘iá»‡n áº£nh",
      "phim hÃ nh Ä‘á»™ng",
      "Ä‘á»‹a Ä‘iá»ƒm du lá»‹ch Viá»‡t Nam",
      "cÃ´ng cá»¥ AI",
      "mÃ³n Äƒn sÃ¡ng lÃ nh máº¡nh",
      "Ã½ tÆ°á»Ÿng kinh doanh online",
      "Ä‘iá»‡n thoáº¡i giÃ¡ ráº»",
      "á»©ng dá»¥ng tÄƒng nÄƒng suáº¥t",
      "xe Ä‘iá»‡n",
      "bÃ i táº­p táº¡i nhÃ ",
      "phÆ°Æ¡ng phÃ¡p há»c tiáº¿ng Anh",
      "dá»‹ch vá»¥ lÆ°u trá»¯ Ä‘Ã¡m mÃ¢y",
      "laptop chÆ¡i game",
      "chiáº¿n lÆ°á»£c marketing sá»‘",
      "Ä‘á»‹a Ä‘iá»ƒm du lá»‹ch gia Ä‘Ã¬nh"
    ],
    audience: [
      "há»c sinh",
      "gia Ä‘Ã¬nh",
      "ngÆ°á»i má»›i báº¯t Ä‘áº§u",
      "doanh nghiá»‡p nhá»",
      "ngÆ°á»i Ä‘i du lá»‹ch",
      "ngÆ°á»i lÃ m viá»‡c tá»« xa",
      "ngÆ°á»i sÃ¡ng táº¡o ná»™i dung",
      "phá»¥ huynh"
    ]
  },
  number: [5, 7, 10, 12, 15, 20],
  year: [2025, 2026, 2027]
};

const RECENT_CACHE_KEY = "recentRandomSearchQueries";
const RECENT_CACHE_LIMIT = 500;

const creativeData = {
  en: {
    intent: ["creative ways to use", "unexpected trends in", "practical guide for", "fresh examples of", "how people compare", "quick research about", "real world uses of", "beginner roadmap for", "advanced tips for", "hidden costs of", "new search ideas for", "step by step plan for"],
    topic: ["AI note taking apps", "electric bikes", "solo travel planning", "meal prep recipes", "home office lighting", "budget gaming laptops", "language learning routines", "digital marketing funnels", "cloud backup tools", "smart home sensors", "personal finance apps", "coffee brewing methods", "indoor herb gardens", "portable projectors", "remote team rituals", "video editing software", "used electric cars", "high protein snacks", "family weekend trips", "cybersecurity basics", "freelance portfolio sites", "online course platforms", "productivity systems", "budget camera gear", "Vietnam travel routes", "fitness tracker features", "small apartment storage", "podcast equipment", "eco friendly packaging", "sleep tracking devices"],
    topicAlt: ["manual spreadsheets", "free alternatives", "premium versions", "mobile apps", "desktop tools", "local shops", "online services", "subscription plans", "open source options", "traditional methods"],
    audience: ["students", "families", "beginners", "small businesses", "travelers", "remote workers", "content creators", "parents", "new freelancers", "college graduates", "busy professionals", "first time buyers", "teachers", "side hustlers", "retirees"],
    persona: ["a first time buyer", "a busy parent", "a remote worker", "a solo founder", "a college student", "a content creator", "a project manager", "a budget traveler", "a beginner", "a small team"],
    angle: ["under a tight budget", "for daily routines", "with simple setup", "without expensive gear", "for small spaces", "that save time", "with real examples", "for long term value", "with low maintenance", "for better decisions", "that work offline", "for weekend projects"],
    context: ["at home", "while traveling", "for work", "during weekends", "in small teams", "for beginners", "before buying", "after moving", "during a busy week", "for side projects"],
    modifier: ["low cost", "unusual", "time saving", "beginner friendly", "privacy focused", "durable", "compact", "high value", "modern", "minimal", "fast", "reliable"],
    format: ["checklist", "comparison", "examples", "review", "guide", "template", "roadmap", "questions", "calculator", "workflow", "case study", "buying guide"],
    problem: ["common problems", "hidden risks", "setup mistakes", "wasted money", "slow workflows", "confusing choices", "maintenance issues", "privacy concerns"],
    solution: ["and how to fix them", "and better alternatives", "with simple solutions", "and what to do instead", "with examples", "explained clearly"],
    comparison: ["compare", "best choice between", "pros and cons of", "difference between", "which is better", "alternatives to"],
    place: ["California", "New York", "Seattle", "Austin", "Vietnam", "Da Nang", "Ho Chi Minh City", "Hanoi", "Singapore", "Tokyo", "Seoul", "Europe"],
    event: ["a price drop", "moving to a new home", "starting a new job", "a software update", "booking a trip", "changing phones", "starting school", "launching a business"],
    timeframe: ["this week", "this month", "in 2026", "for summer", "for winter", "before purchase", "after setup", "in under one hour"]
  },
  vi: {
    intent: ["cach sang tao de dung", "xu huong moi ve", "huong dan thuc te cho", "vi du moi ve", "cach moi nguoi so sanh", "tim hieu nhanh ve", "ung dung thuc te cua", "lo trinh cho nguoi moi ve", "meo nang cao ve", "chi phi an cua", "y tuong tim kiem ve", "ke hoach tung buoc cho"],
    topic: ["ung dung ghi chu AI", "xe dap dien", "lap ke hoach du lich mot minh", "cong thuc meal prep", "den lam viec tai nha", "laptop gaming gia tot", "lich hoc ngoai ngu", "kenh marketing so", "cong cu sao luu dam may", "cam bien nha thong minh", "ung dung quan ly tien", "cach pha ca phe", "vuon rau trong nha", "may chieu mini", "nghi thuc lam viec tu xa", "phan mem dung video", "xe dien da qua su dung", "do an vat giau protein", "chuyen di cuoi tuan cho gia dinh", "kien thuc bao mat co ban", "website portfolio freelancer", "nen tang khoa hoc online", "he thong tang nang suat", "may anh gia tot", "lich trinh du lich Viet Nam", "tinh nang vong deo suc khoe", "luu tru can ho nho", "thiet bi lam podcast", "bao bi than thien moi truong", "thiet bi theo doi giac ngu"],
    topicAlt: ["bang tinh thu cong", "lua chon mien phi", "ban cao cap", "ung dung di dong", "cong cu may tinh", "cua hang dia phuong", "dich vu online", "goi dang ky", "lua chon ma nguon mo", "phuong phap truyen thong"],
    audience: ["hoc sinh", "gia dinh", "nguoi moi bat dau", "doanh nghiep nho", "nguoi di du lich", "nguoi lam viec tu xa", "nguoi sang tao noi dung", "phu huynh", "freelancer moi", "sinh vien sap ra truong", "nguoi ban ron", "nguoi mua lan dau", "giao vien", "nguoi lam nghe tay trai", "nguoi ve huu"],
    persona: ["nguoi mua lan dau", "phu huynh ban ron", "nguoi lam viec tu xa", "nguoi moi kinh doanh", "sinh vien", "nguoi sang tao noi dung", "quan ly du an", "nguoi du lich tiet kiem", "nguoi moi bat dau", "nhom nho"],
    angle: ["voi ngan sach han che", "cho thoi quen hang ngay", "de cai dat don gian", "khong can thiet bi dat tien", "cho khong gian nho", "giup tiet kiem thoi gian", "co vi du thuc te", "co gia tri lau dai", "it bao tri", "giup quyet dinh tot hon", "dung duoc khi offline", "cho du an cuoi tuan"],
    context: ["tai nha", "khi di du lich", "cho cong viec", "vao cuoi tuan", "trong nhom nho", "cho nguoi moi", "truoc khi mua", "sau khi chuyen nha", "trong tuan ban ron", "cho du an phu"],
    modifier: ["gia re", "khac la", "tiet kiem thoi gian", "de bat dau", "tap trung quyen rieng tu", "ben", "nho gon", "dang tien", "hien dai", "toi gian", "nhanh", "on dinh"],
    format: ["checklist", "so sanh", "vi du", "danh gia", "huong dan", "mau", "lo trinh", "cau hoi", "bang tinh", "quy trinh", "case study", "huong dan mua"],
    problem: ["van de thuong gap", "rui ro an", "loi cai dat", "lang phi tien", "quy trinh cham", "lua chon kho hieu", "van de bao tri", "lo ngai rieng tu"],
    solution: ["va cach khac phuc", "va lua chon tot hon", "voi giai phap don gian", "va nen lam gi thay the", "kem vi du", "giai thich de hieu"],
    comparison: ["so sanh", "chon giua", "uu nhuoc diem cua", "khac nhau giua", "cai nao tot hon", "lua chon thay the cho"],
    place: ["California", "New York", "Seattle", "Austin", "Viet Nam", "Da Nang", "Thanh pho Ho Chi Minh", "Ha Noi", "Singapore", "Tokyo", "Seoul", "chau Au"],
    event: ["giam gia", "chuyen nha moi", "bat dau cong viec moi", "cap nhat phan mem", "dat chuyen du lich", "doi dien thoai", "bat dau nam hoc", "mo kinh doanh"],
    timeframe: ["tuan nay", "thang nay", "nam 2026", "cho mua he", "cho mua dong", "truoc khi mua", "sau khi cai dat", "trong duoi mot gio"]
  }
};
const countInput = document.getElementById("count");
const languageSelect = document.getElementById("language");
const openTabsButton = document.getElementById("openTabs");
const refreshPreviewButton = document.getElementById("refreshPreview");
const queriesList = document.getElementById("queries");

let previewQueries = [];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function selectedLanguages() {
  const value = languageSelect.value;
  return value === "mixed" ? ["en", "vi"] : [value];
}

function normalizeCount() {
  const rawCount = Number.parseInt(countInput.value, 10);
  const safeCount = Number.isFinite(rawCount) ? rawCount : 10;
  const count = Math.min(30, Math.max(1, safeCount));
  countInput.value = String(count);
  return count;
}

function loadRecentQueries() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_CACHE_KEY)) || [];
  } catch (_error) {
    return [];
  }
}

function saveRecentQueries(queries) {
  const recentQueries = [...queries, ...loadRecentQueries()].slice(0, RECENT_CACHE_LIMIT);
  localStorage.setItem(RECENT_CACHE_KEY, JSON.stringify(recentQueries));
}

function normalizeQuery(query) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function wordSet(query) {
  return new Set(normalizeQuery(query).split(" ").filter((word) => word.length > 2));
}

function similarityScore(left, right) {
  const leftWords = wordSet(left);
  const rightWords = wordSet(right);
  const sharedWords = [...leftWords].filter((word) => rightWords.has(word)).length;
  const totalWords = new Set([...leftWords, ...rightWords]).size;
  return totalWords === 0 ? 0 : sharedWords / totalWords;
}

function cleanQuery(query) {
  return query.replace(/\s+/g, " ").trim();
}

function buildQuery(language) {
  const words = creativeData[language];
  const topic = randomItem(words.topic);
  const topicAlt = randomItem(words.topicAlt);
  const audience = randomItem(words.audience);
  const persona = randomItem(words.persona);
  const year = randomItem(data.year);

  const enPatterns = [
    `${randomItem(words.intent)} ${topic} ${randomItem(words.angle)} ${randomItem(words.context)}`,
    `${randomItem(words.modifier)} ${topic} ${randomItem(words.format)} for ${audience} ${randomItem(words.timeframe)}`,
    `${randomItem(words.comparison)} ${topic} vs ${topicAlt} for ${audience}`,
    `${randomItem(words.problem)} with ${topic} ${randomItem(words.solution)} ${year}`,
    `${randomItem(words.place)} ${topic} ${randomItem(words.angle)} ${randomItem(words.format)}`,
    `${persona} guide to ${topic} ${randomItem(words.context)}`,
    `${topic} mistakes ${audience} should avoid ${year}`,
    `${topic} after ${randomItem(words.event)} ${randomItem(words.format)}`,
    `${topic} questions people ask about ${randomItem(words.angle)}`,
    `${randomItem(words.modifier)} ${topic} examples for ${audience}`,
    `${topic} tools and workflows for ${persona}`,
    `top ${randomItem(data.number)} ${randomItem(words.modifier)} ${topic} ideas ${randomItem(words.timeframe)}`
  ];

  const viPatterns = [
    `${randomItem(words.intent)} ${topic} ${randomItem(words.angle)} ${randomItem(words.context)}`,
    `${topic} ${randomItem(words.format)} cho ${audience} ${randomItem(words.timeframe)}`,
    `${randomItem(words.comparison)} ${topic} va ${topicAlt} cho ${audience}`,
    `${randomItem(words.problem)} voi ${topic} ${randomItem(words.solution)} ${year}`,
    `${randomItem(words.place)} ${topic} ${randomItem(words.angle)} ${randomItem(words.format)}`,
    `huong dan ${topic} cho ${persona} ${randomItem(words.context)}`,
    `loi thuong gap ve ${topic} cho ${audience} ${year}`,
    `${topic} sau ${randomItem(words.event)} ${randomItem(words.format)}`,
    `cau hoi pho bien ve ${topic} ${randomItem(words.angle)}`,
    `mau ${topic} ${randomItem(words.modifier)} cho ${audience}`,
    `cong cu va quy trinh ${topic} cho ${persona}`,
    `top ${randomItem(data.number)} y tuong ${topic} ${randomItem(words.modifier)} ${randomItem(words.timeframe)}`
  ];

  return cleanQuery(randomItem(language === "vi" ? viPatterns : enPatterns));
}

function findLeastSimilarQuery(language, existingQueries, recentQueries) {
  let bestQuery = "";
  let bestScore = Number.POSITIVE_INFINITY;
  const comparisonPool = [...existingQueries, ...recentQueries.slice(0, 100)];

  for (let attempt = 0; attempt < 40; attempt += 1) {
    const query = buildQuery(language);
    const normalizedQuery = normalizeQuery(query);

    if (!normalizedQuery || existingQueries.some((item) => normalizeQuery(item) === normalizedQuery)) {
      continue;
    }

    const score = comparisonPool.reduce(
      (highestScore, item) => Math.max(highestScore, similarityScore(query, item)),
      0
    );

    if (score < bestScore) {
      bestQuery = query;
      bestScore = score;
    }

    if (score < 0.28) {
      break;
    }
  }

  return bestQuery || buildQuery(language);
}

function generateQueries(count) {
  const languages = selectedLanguages();
  const recentQueries = loadRecentQueries();
  const queries = [];
  const normalizedQueries = new Set();
  let attempts = 0;

  while (queries.length < count && attempts < count * 80) {
    const language = languages[queries.length % languages.length];
    const query = findLeastSimilarQuery(language, queries, recentQueries);
    const normalizedQuery = normalizeQuery(query);

    if (!normalizedQueries.has(normalizedQuery)) {
      queries.push(query);
      normalizedQueries.add(normalizedQuery);
    }

    attempts += 1;
  }

  while (queries.length < count) {
    const language = randomItem(languages);
    const query = `${buildQuery(language)} ${randomItem(data.number)}`;
    const normalizedQuery = normalizeQuery(query);

    if (!normalizedQueries.has(normalizedQuery)) {
      queries.push(query);
      normalizedQueries.add(normalizedQuery);
    }
  }

  saveRecentQueries(queries);
  return queries;
}
function renderPreview() {
  previewQueries = generateQueries(normalizeCount());
  queriesList.replaceChildren(
    ...previewQueries.map((query) => {
      const item = document.createElement("li");
      item.textContent = query;
      return item;
    })
  );
}

async function openSearchTabs() {
  const count = normalizeCount();
  const queries = previewQueries.length === count ? previewQueries : generateQueries(count);

  openTabsButton.disabled = true;
  openTabsButton.textContent = "Opening...";
  await chrome.runtime.sendMessage({ type: "OPEN_SEARCH_TABS", queries });
}

countInput.addEventListener("change", renderPreview);
languageSelect.addEventListener("change", renderPreview);
refreshPreviewButton.addEventListener("click", renderPreview);
openTabsButton.addEventListener("click", openSearchTabs);

renderPreview();

