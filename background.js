(function () {
  "use strict";

  const mindWipeSites = ["news.ycombinator.com", "google.com/search"];

  function closeTabsByKeyword(keywords) {
    if (!keywords || keywords.length === 0) {
      return;
    }

    chrome.tabs.query({}, function (tabs) {
      for (const tab of tabs) {
        for (const keyword of keywords) {
          for (const splitKeyword of keyword.split(" ")) {
            if (tab.url.indexOf(splitKeyword) !== -1) {
              chrome.tabs.remove(tab.id);
            }
          }
        }
      }
    });
  }

  chrome.runtime.onMessage.addListener(function (response) {
    if (response.event === "text-entered" && response.text) {
      closeTabsByKeyword([response.text]);
    } else if (response.event === "mind-wiped") {
      closeTabsByKeyword(mindWipeSites);
    }
  });

  chrome.contextMenus.create({
    title: "Close all tabs from this domain",
    onclick: function (event) {
      const keyword = new URL(event.pageUrl).hostname;
      closeTabsByKeyword([keyword]);
    },
  });
})();
