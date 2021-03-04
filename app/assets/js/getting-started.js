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
var sidebarContainer = sidebar.querySelector(".js-toc-sidebar-container");

if (sidebarContainer) {
  window.addEventListener('scroll', function(e) {
    selectCurrentTocCategory();
  })
}

selectCurrentTocCategory();

function selectCurrentTocCategory() {
  var tocContainer = document.querySelector("#TableOfContents")
  var sections = document.querySelectorAll(".js-content > h2, .js-content > h3, .js-content > h4");
  var selectedElement = tocContainer.querySelector(".is-active");
  var currentIndex = 0;

  for (var i = 0; i < sections.length; i++) {
    if(sections[i].getBoundingClientRect().top < 200) {
      currentIndex = i;
    }
    else {
      break;
    }
  }
  var newElement = tocContainer.querySelector('a[href="#'+ sections[currentIndex].id +'"]');
  newElement.classList.add("is-active");
  if ((newElement != selectedElement) && selectedElement) {
    selectedElement.classList.remove("is-active");
  }

  // selectCategoryId(sections[currentIndex].id);
}

var to = null;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    to = null;

    var href = this.getAttribute('href');
    var element = document.querySelector(href);
    var y = element.offsetTop - 136;

    // element.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({ top: y, behavior: 'smooth' });

    to = window.setTimeout(function () {
      window.location.hash = href;
    }, 250);
  });
});