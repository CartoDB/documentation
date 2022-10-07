if(!document.queryCommandSupported('copy')) {
  return;
}

function flashCopyMessage (el, msg) {
  el.textContent = msg;
  setTimeout(() => {
    el.textContent = "Copy";
  }, 1000);
}

function selectText (node) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return selection;
}

function addCopyButton (containerEl) {
  const copyBtn = document.createElement("button");
  copyBtn.className = "highlight-copy-btn";
  copyBtn.textContent = "Copy";

  const codeEl = containerEl.getElementsByTagName('code')[1];
  copyBtn.addEventListener('click', () => {
    try {
      const selection = selectText(codeEl);
      document.execCommand('copy');
      selection.removeAllRanges();
      flashCopyMessage(copyBtn, 'Copied!')
    } catch(e) {
      console && console.log(e);
      flashCopyMessage(copyBtn, 'Failed :\'(')
    }
  });

  containerEl.appendChild(copyBtn);
}

function addStyle () {
  const styles = `
    .highlight {
      position: relative;
    }

    .highlight-copy-btn {
      position: absolute;
      top: 0px;
      right: 0px;
      border-radius: 0px 4px;
      font-size: 0.8em;
      font-weight: 600;
      line-height: 1.8;
      min-width: 60px;
      text-align: center;
      color: #fff;
      background-color: #777;
    }

    .highlight-copy-btn:hover {
      background-color: #666;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Add copy button to code blocks
// (only if codeHighlight is not applied)
if (!document.querySelector('[data-type="copy"]')) {
  addStyle();
  const highlightBlocks = document.getElementsByClassName('highlight');
  Array.prototype.forEach.call(highlightBlocks, addCopyButton);
}
