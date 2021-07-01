var isMobile = false;
var asideMenu = document.querySelector("#aside-menu");
var tocContainer = asideMenu.querySelector(".toc--container");
var tocLinks = asideMenu.querySelector(".toc--links");
var dropdowns = asideMenu.querySelectorAll(".dropdown");

window.addEventListener("resize", onResize);

dropdowns.forEach((dropdown) => {
  addDropdownListeners(dropdown);
});

onResize();

function onResize() {
  if (window.innerWidth <= 800) {
    isMobile = true;
    tocContainer.classList.add('dropdown');
    tocLinks.classList.add('dropdown-options', 'hide');
    addDropdownListeners(tocContainer);
    document.querySelector('.aside-menu-title-desktop').display = 'none';
    document.querySelector('.aside-menu-title-desktop').hidden = true;
    document.querySelector('.aside-menu-title-mobile').display = 'initial';
    document.querySelector('.aside-menu-title-mobile').hidden = false;
  } else {
    isMobile = false;
    tocContainer.classList.remove('dropdown');
    tocLinks.classList.remove('dropdown-options', 'hide');
    document.querySelector('.aside-menu-title-desktop').display = 'initial';
    document.querySelector('.aside-menu-title-desktop').hidden = false;
    document.querySelector('.aside-menu-title-mobile').display = 'none';
    document.querySelector('.aside-menu-title-mobile').hidden = true;
  }
}

function addDropdownListeners(dropdown) {
  dropdown.addEventListener("click", toggleMenuDisplay);

  var innerDropdowns = dropdown.querySelectorAll(".dropdown");
  if (innerDropdowns.length) {
    innerDropdowns.forEach((inner) => {
      addDropdownListeners(inner);
    });
  }
}

function toggleClass(elem, className) {
  elem.classList.toggle(className);

  return elem;
}

function toggleMenuDisplay(event) {
  event.stopPropagation();

  const dropdown = event.currentTarget;
  const options = dropdown.querySelector(".dropdown-options");
  const caret = dropdown.querySelector(".caret");
  console.log(caret);

  toggleClass(dropdown, "hide");
  toggleClass(options, "hide");
  toggleClass(caret, "rotate");
}