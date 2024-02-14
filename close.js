(function () {
  "use strict";

  const inputArea = document.getElementById("edit-box");
  const history = document.getElementById("history");
  const mindWipe = document.getElementById("wipe");
  const dedupe = document.getElementById("dedupe");

  async function addToStorage(inputString) {
    const wipeHistory = await getHistory();

    if (!wipeHistory.includes(inputString)) {
      if (inputString.trim().length === 0) return;
      wipeHistory.push(inputString);
      await browser.storage.local.set({ wipeHistory });
    }
  }

  async function getHistory() {
    const { wipeHistory } = await browser.storage.local.get("wipeHistory");
    return wipeHistory || [];
  }

  async function handleInputFocus() {
    const wipeHistory = await getHistory();
    history.innerHTML = "";
    wipeHistory.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      history.appendChild(option);
    });
  }

  inputArea.addEventListener("focus", handleInputFocus);

  const submitText = () => {
    chrome.runtime.sendMessage({
      event: "text-entered",
      text: inputArea.value.trim(),
    });
    addToStorage(inputArea.value.trim());
    inputArea.value = "";
  };

  inputArea.focus();
  inputArea.addEventListener(
    "keyup",
    (event) => {
      if (event.code === "Enter") {
        submitText();
      }
    },
    false
  );
  dedupe.addEventListener(
    "click",
    () => {
      chrome.runtime.sendMessage({
        event: "de-dupe",
      });
    },
    false
  );
  mindWipe.addEventListener(
    "click",
    () => {
      chrome.runtime.sendMessage({
        event: "mind-wiped",
      });
    },
    false
  );

  document.querySelector(".ok").addEventListener("click", () => submitText());

  document
    .querySelectorAll(".close")
    .forEach((closeElem) =>
      closeElem.addEventListener("click", () => window.close())
    );
})();
