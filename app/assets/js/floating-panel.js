document.querySelectorAll("[data-toggle~=panel]").forEach(setupDropdown);

function setupDropdown(dropdownToggle) {
  var startOpen = dropdownToggle.dataset.startOpen === "true";
  var dropdownMenu = dropdownToggle.parentNode.querySelector(".floating-panel__dropdown");

  dropdownToggle.setAttribute("aria-haspopup", "true");
  dropdownToggle.setAttribute("aria-expanded", "true");
  dropdownToggle.querySelector(".panel-trigger").addEventListener("click", toggleDropdown, false);
  
  dropdownMenu.setAttribute("aria-hidden", "false");

  function isOpen() {
    return dropdownToggle.getAttribute("aria-expanded") === "true";
  }

  function closeDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("aria-hidden", "true");
    dropdownMenu.classList.remove("panel-open");
  }

  function openDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownMenu.setAttribute("aria-hidden", "false");
    dropdownMenu.classList.add("panel-open");
    dropdownMenu.children[0].focus();
  }

  function toggleDropdown() {
    if (isOpen()) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  if (startOpen) {
    openDropdown();
  }
}
