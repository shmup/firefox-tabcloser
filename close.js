(function () {
  "use strict";

  const inputArea = document.getElementById("edit-box");
  const mindWipe = document.getElementById("wipe");
  const dedupe = document.getElementById("dedupe");

  const submitText = () => {
    chrome.runtime.sendMessage({
      event: "text-entered",
      text: inputArea.value.trim(),
    });
    inputArea.value = "";
  }

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

  document
    .querySelector(".ok")
    .addEventListener("click", () => submitText());

  document
    .querySelectorAll(".close")
    .forEach((closeElem) =>
      closeElem.addEventListener("click", () => window.close())
    );
})();
