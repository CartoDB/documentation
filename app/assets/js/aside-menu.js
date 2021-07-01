var isMobile = false;
var asideMenu = document.querySelector("#aside-menu");
var tocContainer = asideMenu.querySelector(".toc--container");
var tocLinks = asideMenu.querySelector(".toc--links");
var titleDesktop = asideMenu.querySelector(".aside-menu-title-desktop");
var titleMobile = asideMenu.querySelector(".aside-menu-title-mobile");
var dropdowns = asideMenu.querySelectorAll(".dropdown");

window.addEventListener("resize", onResize);

dropdowns.forEach((dropdown) => {
  addDropdownListeners(dropdown, true);
});

onResize();

function onResize() {
  if (window.innerWidth <= 800) {
    isMobile = true;
    setMobile();
    addClickOutside();
  } else {
    isMobile = false;
    setDesktop();
    removeClickOutside();
  }
}

function setDesktop() {
  tocContainer.setAttribute("data-click-outside", false);
  tocContainer.classList.remove("dropdown", "hide");
  removeDropdownListeners(tocContainer);
  tocLinks.classList.remove("dropdown-options", "hide");
  titleDesktop.display = "initial";
  titleDesktop.hidden = false;
  titleMobile.display = "none";
  titleMobile.hidden = true;
}

function setMobile() {
  tocContainer.setAttribute("data-click-outside", true);
  tocContainer.classList.add("dropdown", "hide");
  addDropdownListeners(tocContainer, false);
  tocLinks.classList.add("dropdown-options", "hide");
  titleDesktop.display = "none";
  titleDesktop.hidden = true;
  titleMobile.display = "initial";
  titleMobile.hidden = false;
}

function addClickOutside() {
  document.addEventListener("click", function (event) {
    var isClickInside = tocContainer.contains(event.target);

    if (!isClickInside && !tocContainer.classList.contains('hide')) {
      toggleMenuDisplay({ currentTarget: titleMobile, stopPropagation: () => {} });
    }
  });
}

function removeClickOutside() {
  document.removeEventListener("click")
}

function addDropdownListeners(dropdown, children) {
  const btn = dropdown.querySelector(".dropdown-btn");
  btn.addEventListener("click", toggleMenuDisplay);

  var innerDropdowns = dropdown.querySelectorAll(".dropdown");
  if (innerDropdowns.length && children) {
    innerDropdowns.forEach((inner) => {
      addDropdownListeners(inner, true);
    });
  }
}

function removeDropdownListeners(el) {
  el.removeDropdownListeners('click', toggleMenuDisplay);
}

function toggleClass(elem, className) {
  elem.classList.toggle(className);

  return elem;
}

function toggleMenuDisplay(event) {
  event.stopPropagation();

  const btn = event.currentTarget;
  const dropdown = btn.parentNode;
  const options = dropdown.querySelector(".dropdown-options");

  toggleClass(btn, "hide");
  toggleClass(dropdown, "hide");
  toggleClass(options, "hide");
}