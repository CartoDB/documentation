/**
 * NEW: new component aside-menu
 */
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
   tocLinks.classList.remove("dropdown-options", "hide");
   removeDropdownListeners(tocContainer);
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
   document.addEventListener("click", onClickOutside, false);
 }
 
 function removeClickOutside() {
   document.removeEventListener("click", onClickOutside);
 }
 
 function onClickOutside (event) {
   var isClickInside = tocContainer.contains(event.target);
 
   if (!isClickInside && !tocContainer.classList.contains("hide")) {
     toggleMenuDisplay({
       currentTarget: titleMobile,
       stopPropagation: () => {},
     });
   }
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
 
 function removeDropdownListeners(dropdown) {
   const btn = dropdown.querySelector(".dropdown-btn");
   btn.removeEventListener("click", toggleMenuDisplay);
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
 
 
 // Scroll navigation and active items
 var selectedElement;
 
 if (asideMenu) {
   window.addEventListener("scroll", function (e) {
     selectCurrentTocCategory();
   });
 }
 
 selectCurrentTocCategory();
 
 function selectCurrentTocCategory() {
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
   var newElement = tocContainer.querySelector('a[href="#' + sections[currentIndex].id + '"]');
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