let isOpening = false;

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function openSearchTabsStepByStep(queries) {
  isOpening = true;

  try {
    for (const query of queries) {
      const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&form=QBLH`;
      await chrome.tabs.create({ url, active: true });
      await wait(7000);
    }
  } finally {
    isOpening = false;
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "OPEN_SEARCH_TABS") {
    return false;
  }

  if (isOpening) {
    sendResponse({ ok: false, reason: "already_opening" });
    return false;
  }

  openSearchTabsStepByStep(message.queries || [])
    .then(() => sendResponse({ ok: true }))
    .catch((error) => sendResponse({ ok: false, reason: error.message }));

  return true;
});
