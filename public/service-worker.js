/* eslint-disable no-undef */
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId) => {
  await chrome.sidePanel.setOptions({
    tabId,
    path: "index.html",
    enabled: true,
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function (data) {
    chrome.runtime.sendMessage({
      name: "tealium-event",
      data: data,
    });
  },
  { urls: ["*://datacloud-us-east-1.tealiumiq.com/*"] },
  ["requestBody"]
);
