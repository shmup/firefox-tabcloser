(function () {
  "use strict";

  const inputArea = document.getElementById("edit-box");
  const mindWipe = document.getElementById("wipe");

  inputArea.focus();
  inputArea.addEventListener(
    "keyup",
    (event) => {
      if (event.code === "Enter") {
        chrome.runtime.sendMessage({
          event: "text-entered",
          text: inputArea.value.trim(),
        });
        inputArea.value = "";
      }
    },
    false
  );
  mindWipe.addEventListener(
    "click",
    () => {
      chrome.runtime.sendMessage({
        event: "mind-wiped",
        text: inputArea.value.trim(),
      });
    },
    false
  );
})();
