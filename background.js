(async function () {
  "use strict";

  const mindWipeSites = [
    "duckduckgo.com",
    "news.ycombinator.com",
    "google.com/search",
    "amazon.com",
    "ebay.com",
    "twitter.com",
    "torrentday",
  ];

  function closeDuplicateTabs() {
    browser.tabs.query({}, function (tabs) {
      const tabUrls = new Set();
      for (const tab of tabs) {
        const tabUrl = tab.url;

        if (tabUrls.has(tabUrl)) {
          browser.tabs.remove(tab.id);
        } else {
          tabUrls.add(tabUrl);
        }
      }
    });
  }

  function closeTabsByKeyword(keywords) {
    if (!keywords || keywords.length === 0) return;

    browser.tabs.query({}, function (tabs) {
      for (const tab of tabs) {
        for (const keyword of keywords) {
          for (const splitKeyword of keyword.split(" ")) {
            if (tab.url.indexOf(splitKeyword) !== -1) {
              browser.tabs.remove(tab.id);
            }
          }
        }
      }
    });
  }

  browser.runtime.onMessage.addListener(function (response) {
    if (response.event === "text-entered" && response.text) {
      closeTabsByKeyword([response.text]);
    } else if (response.event === "mind-wiped") {
      closeTabsByKeyword(mindWipeSites);
      closeDuplicateTabs();
    } else if (response.event === "de-dupe") {
      closeDuplicateTabs();
    }
  });

  browser.contextMenus.create({
    title: "Close all tabs from this domain",
    onclick: function (event) {
      const keyword = new URL(event.pageUrl).hostname;
      closeTabsByKeyword([keyword]);
    },
  });

  // Listen for when a new tab is created
  browser.tabs.onCreated.addListener((_tab) => {
    console.debug(_tab);
  });

  // Listen for when a tab is removed
  browser.tabs.onRemoved.addListener((_tabId) => {
    console.debug(_tabId);
  });
})();
