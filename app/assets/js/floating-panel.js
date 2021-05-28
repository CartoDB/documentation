document.querySelectorAll("[data-toggle~=panel]").forEach(setupDropdown);

function setupDropdown(dropdownToggle) {
  var startOpen = dropdownToggle.dataset.startOpen === "true";
  var dropdownTrigger = dropdownToggle.querySelector(".floating-panel__trigger");
  var dropdownMenu = dropdownToggle.querySelector(".floating-panel__dropdown");

  dropdownToggle.setAttribute("aria-haspopup", "true");
  dropdownToggle.setAttribute("aria-expanded", "true");
  dropdownTrigger.addEventListener("click", toggleDropdown, false);
  
  dropdownMenu.setAttribute("aria-hidden", "false");

  function isOpen() {
    return dropdownToggle.getAttribute("aria-expanded") === "true";
  }

  function closeDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("aria-hidden", "true");
    dropdownTrigger.classList.remove("panel-open");
    dropdownMenu.classList.remove("panel-open");
  }

  function openDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownMenu.setAttribute("aria-hidden", "false");
    dropdownTrigger.classList.add("panel-open");
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
