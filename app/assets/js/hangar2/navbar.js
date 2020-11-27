require('./tabs')

var navbarButton = document.querySelector(".js-toggle-mobile-nav");
var navbar = document.querySelector("nav.navbar");

if (navbarButton) {
  navbarButton.addEventListener("click", toggleNavbarMobile);
}

function toggleNavbarMobile(e) {
  var navbarMobile = document.querySelector(".js-navbar-mobile");
  var body = document.querySelector("body");
  this.classList.toggle("open");
  navbar.classList.toggle("navbar--open");
  navbarMobile.classList.toggle("is-active");
  body.classList.toggle("u-overflow");
}

// Tabs mobile

var ticking = false;
var mobileTabs = document.querySelectorAll('.js-tab-mobile');
var mobileElements = document.querySelectorAll('.js-tab-element');
var scrollMobile = document.querySelector('.js-scroll-mobile');
var solutionsLink = document.querySelector('.js-solutions-tab-link');
var solutionsName = null;
if(solutionsLink) {
  solutionsName = solutionsLink.querySelector('.js-tab-name');
}

for (var i = 0; i < mobileTabs.length; i++) {
  mobileTabs[i].addEventListener("click", tabClicked);
}

function tabClicked() {
  changeTabSelector(this);
  var containerSelected = this.dataset.target;
  var containerElement = document.getElementById(containerSelected);
  scrollToContainer(containerElement);
}

function changeTabSelector(selectedTab) {
  var lineTab = document.querySelector('.js-line-tab');
  var leftDistance = selectedTab.getBoundingClientRect().left - selectedTab.parentElement.getBoundingClientRect().left;
  lineTab.style.left = leftDistance + "px";
  lineTab.style.width = selectedTab.offsetWidth + "px";
  solutionsName.textContent = selectedTab.dataset.name;
  solutionsLink.href = selectedTab.dataset.url;
}

function scrollToContainer(scrollDestination) {
  var scrollPosition = scrollDestination.offsetLeft - scrollMobile.offsetLeft;
  scrollMobile.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
}

if(scrollMobile) {
  scrollMobile.addEventListener('scroll', function(e) {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollDetection();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function scrollDetection() {
  var containerLeft = scrollMobile.getBoundingClientRect().left;
  for(var i = 0; i < mobileElements.length; i++){
    var rects = mobileElements[i].getBoundingClientRect();
    if((rects.right - containerLeft) > 200) {
      var destinationTab = document.querySelector('[data-target="'+mobileElements[i].id + '"]');
      changeTabSelector(destinationTab);
      break;
    }
  }
}

//Collapse mobile menu 
var collapsableElements = document.querySelectorAll(".js-collapsable-click");

for(var i = 0; i < collapsableElements.length; i++) {
  collapsableElements[i].addEventListener("click", toggleCollapse);
}

function toggleCollapse() {
  var parent = this.parentElement;
  parent.classList.toggle("navbar__collapsed")
}