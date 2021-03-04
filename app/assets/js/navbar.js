require('./hangar2/navbar');

var searchElements = document.getElementsByClassName("js-search");
for (var i = 0; i < searchElements.length; i++) {
  searchElements[i].addEventListener("focus", hideElements);
  searchElements[i].addEventListener("focusout", showElements);
}

function hideElements() {
  var elements = document.getElementsByClassName("js-hide-on-focus");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
}

function showElements() {
  var elements = document.getElementsByClassName("js-hide-on-focus");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("hidden");
  }
}

// Sticky nav
window.addEventListener('scroll', onWindowScrollHandler, { pasive: true });
var navbar = document.querySelector('.navbar');
var parent = navbar.parentElement;
var parentHeight = parent.getBoundingClientRect().height;

function onWindowScrollHandler(event) {
  const scrollPosition = document.documentElement.scrollTop;
  if (scrollPosition > parentHeight + 10) {
    parent.style.height = parentHeight + 'px';  // NOTE: to fix blinking
    navbar.classList.add("navbar_sticky");
  } else {
    navbar.classList.remove("navbar_sticky");
  }
}
onWindowScrollHandler();