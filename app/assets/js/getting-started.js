//Tutorials module
var tutorial = document.querySelectorAll(".js-interactive-tutorial")

for (var i = 0; i < tutorial.length; i++) {
  initTutorialSidebar(tutorial[i])  
}

function initTutorialSidebar(tutorial) {
  var tutorialSteps = tutorial.querySelectorAll(".js-tutorial-step");
  var stepList = tutorial.querySelector(".js-step-list");
  for(var i = 0; i < tutorialSteps.length; i++) {
    var li = document.createElement("li");
    if(i === 0)
      li.classList.add("is-selected");
    li.innerHTML = tutorialSteps[i].dataset.name + '<div class="expansion-line"></div>';
    li.dataset.elem = tutorialSteps[i].dataset.elem;
    li.addEventListener("click", changeTutorial);
    stepList.appendChild(li);
  }
}

function changeTutorial() {
  var parent = this.parentElement;
  parent.querySelector(".is-selected").classList.remove("is-selected");
  this.classList.add("is-selected");
  changeExample(this.dataset.elem, this.closest(".js-interactive-tutorial"));
}

function changeExample(elemName, container) {
  var elem = container.querySelector(".js-tutorial-step[data-elem=" + elemName + "]");
  var activeElem = container.querySelector(".js-tutorial-step.is-active");
  activeElem.classList.remove("is-active");
  elem.classList.add("is-active");
}

// NOTE: Migrated position logic to CSS sticky position
//Sidebar
var sidebar = document.querySelector(".js-toc-sidebar");
var sidebarContainer = sidebar && sidebar.querySelector(".js-toc-sidebar-container");

if (sidebarContainer) {
  window.addEventListener('scroll', function(e) {
    selectCurrentTocCategory();
  })
}

selectCurrentTocCategory();

var selectedElement;

function selectCurrentTocCategory() {
  var tocContainer = document.querySelector("#TableOfContents")
  var sections = document.querySelectorAll(".js-content > h2, .js-content > h3, .js-content > h4");

  var currentIndex = 0;
  for (var i = 0; i < sections.length; i++) {
    if(sections[i].getBoundingClientRect().top < 200) {
      currentIndex = i;
    }
    else {
      break;
    }
  }

  // Activate node items recursively
  var newElement = tocContainer && tocContainer.querySelector('a[href="#'+ sections[currentIndex].id +'"]');
  if (selectedElement !== newElement) {
    selectedElement = newElement;
    deactivateNodes(tocContainer);
    activateNodes(selectedElement);
  }
}

function deactivateNodes(tocContainer) {
  tocContainer && tocContainer.querySelectorAll(".is-active").forEach(function (item) {
    item.classList.remove("is-active");
  });
}

function activateNodes(el) {
  if (el) {
    var fe = el.firstElementChild;
    if (fe && fe.tagName === 'A') {
      fe.classList.add('is-active');
    }
    if (!(fe && fe.classList.contains('toc__link'))) {
      activateNodes(el.parentElement);
    }
  }
}

var to = null;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    to = null;

    var href = this.getAttribute('href');
    var element = document.querySelector(href);
    var y = element.offsetTop - 100;

    // element.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({ top: y, behavior: 'smooth' });

    to = window.setTimeout(function () {
      window.location.hash = href;
    }, 250);
  });
});

document.querySelectorAll("[data-toggle~=dropdown]").forEach(setupDropdown);

function setupDropdown(dropdownToggle) {
  var startOpen = dropdownToggle.dataset.startOpen === "true";
  dropdownToggle.setAttribute("aria-haspopup", "true");
  dropdownToggle.setAttribute("aria-expanded", "false");

  var dropdownMenu = dropdownToggle.parentNode.querySelector(".dropdown-menu");

  dropdownMenu.setAttribute("aria-hidden", "true");

  dropdownToggle.onclick = toggleDropdown;

  if (startOpen) {
    toggleDropdown();
  }

  function toggleDropdown() {
    if (dropdownToggle.getAttribute("aria-expanded") === "true") {
      dropdownToggle.setAttribute("aria-expanded", "false");
      dropdownMenu.setAttribute("aria-hidden", "true");
      dropdownToggle.parentNode.classList.remove("dropdown-on");
      return;
    }
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownMenu.setAttribute("aria-hidden", "false");
    dropdownToggle.parentNode.classList.add("dropdown-on");
    dropdownMenu.children[0].focus();
    return;
  }
}