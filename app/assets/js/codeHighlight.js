document.querySelectorAll("[data-highlight]").forEach(setupHighlight);

function selectText(node) {
  var selection = window.getSelection();
  var range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}

function setupCopyButton({ button, code }) {
  button.addEventListener("click", function () {
    try {
      const selection = selectText(code);
      document.execCommand("copy");
      selection.removeAllRanges();
    } catch (e) {
      console.log(e);
    }
  });
}

function setupHighlight(highlight) {
  var copyButton = highlight.querySelectorAll("[data-type=copy]")[0];
  var code = highlight.querySelectorAll("[data-lang]")[0];

  setupCopyButton({ button: copyButton, code });
}
