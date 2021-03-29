var sidebar = document.querySelector(".js-toc-sidebar");
var sidebarContainer =
  sidebar && sidebar.querySelector(".js-toc-sidebar-container");

if (sidebarContainer) {
  window.addEventListener("scroll", function (e) {
    selectCurrentTocCategory();
  });
}

selectCurrentTocCategory();

var selectedElement;

function selectCurrentTocCategory() {
  var tocContainer = document.querySelector("#TableOfContents");
  var sections = document.querySelectorAll(
    ".js-content > h2, .js-content > h3, .js-content > h4"
  );

  var currentIndex = 0;
  for (var i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < 200) {
      currentIndex = i;
    } else {
      break;
    }
  }

  // Activate node items recursively
  var newElement =
    tocContainer &&
    tocContainer.querySelector('a[href="#' + sections[currentIndex].id + '"]');
  if (selectedElement !== newElement) {
    selectedElement = newElement;
    deactivateNodes({ el: tocContainer });
    activateNodes({ el: selectedElement, isCurrent: true });
  }
}

function deactivateNodes({ el }) {
  el &&
    el.querySelectorAll(".is-active, .is-current").forEach(function (item) {
      item.classList.remove("is-active");
      item.classList.remove("is-current");
    });
}

function activateNodes({ isCurrent, el }) {
  const stop = !el || el.classList.contains("toc-hugo__folder-one");

  if (stop) {
    return;
  }

  var firstChild = el.firstElementChild;
  var hasFirstChild = !!firstChild;

  if (hasFirstChild) {
    var firstChildIsLink =
      firstChild.tagName === "A" || firstChild.tagName === "BUTTON";

    if (firstChildIsLink) {
      firstChild.classList.add(isCurrent ? "is-current" : "is-active");
    }

    activateNodes({ el: el.parentElement, isCurrent: false });
  } else {
    activateNodes({ el: el.parentElement, isCurrent: true });
  }
}

var to = null;
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();

    to = null;

    var href = this.getAttribute("href");
    var element = document.querySelector(href);
    var y = element.offsetTop - 100;

    window.scrollTo({ top: y, behavior: "smooth" });

    to = window.setTimeout(function () {
      window.location.hash = href;
    }, 250);
  });
});
