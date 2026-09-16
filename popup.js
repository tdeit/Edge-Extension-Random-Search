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
    "top {number} {topic} hay nhất {year}",
    "{topic} tốt nhất cho {audience} năm {year}",
    "xu hướng {topic} đáng chú ý năm {year}",
    "cách chọn {topic} phù hợp cho {audience}",
    "so sánh {topic} mới nhất {year}",
    "tin tức mới về {topic} năm {year}",
    "hướng dẫn cơ bản về {topic}",
    "ý tưởng {topic} tiết kiệm cho {audience}",
    "mẹo và ví dụ về {topic}",
    "{topic} phổ biến nhất hiện nay"
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
      "phim điện ảnh",
      "phim hành động",
      "địa điểm du lịch Việt Nam",
      "công cụ AI",
      "món ăn sáng lành mạnh",
      "ý tưởng kinh doanh online",
      "điện thoại giá rẻ",
      "ứng dụng tăng năng suất",
      "xe điện",
      "bài tập tại nhà",
      "phương pháp học tiếng Anh",
      "dịch vụ lưu trữ đám mây",
      "laptop chơi game",
      "chiến lược marketing số",
      "địa điểm du lịch gia đình"
    ],
    audience: [
      "học sinh",
      "gia đình",
      "người mới bắt đầu",
      "doanh nghiệp nhỏ",
      "người đi du lịch",
      "người làm việc từ xa",
      "người sáng tạo nội dung",
      "phụ huynh"
    ]
  },
  number: [5, 7, 10, 12, 15, 20],
  year: [2025, 2026, 2027]
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

function buildQuery(language) {
  const template = randomItem(templates[language]);
  return template
    .replace("{number}", randomItem(data.number))
    .replace("{year}", randomItem(data.year))
    .replace("{topic}", randomItem(data[language].topic))
    .replace("{audience}", randomItem(data[language].audience));
}

function generateQueries(count) {
  const languages = selectedLanguages();
  const queries = new Set();
  let attempts = 0;

  while (queries.size < count && attempts < count * 20) {
    const language = randomItem(languages);
    queries.add(buildQuery(language));
    attempts += 1;
  }

  return Array.from(queries);
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
