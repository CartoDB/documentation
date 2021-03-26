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
