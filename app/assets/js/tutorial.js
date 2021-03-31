var tutorial = document.querySelectorAll(".js-interactive-tutorial");

for (var i = 0; i < tutorial.length; i++) {
  initTutorialSidebar(tutorial[i]);
}

function initTutorialSidebar(tutorial) {
  var tutorialSteps = tutorial.querySelectorAll(".js-tutorial-step");
  var stepList = tutorial.querySelector(".js-step-list");

  for (var i = 0; i < tutorialSteps.length; i++) {
    var li = document.createElement("li");
    if (i === 0) li.classList.add("is-selected");
    li.innerHTML =
      tutorialSteps[i].dataset.name + '<div class="expansion-line"></div>';
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
  var elem = container.querySelector(
    ".js-tutorial-step[data-elem=" + elemName + "]"
  );
  var activeElem = container.querySelector(".js-tutorial-step.is-active");
  activeElem.classList.remove("is-active");
  elem.classList.add("is-active");
}
