document.querySelectorAll("[data-toggle~=dropdown]").forEach(setupDropdown);

function setupDropdown(dropdownToggle) {
  var startOpen = dropdownToggle.dataset.startOpen === "true";
  var closeWhenClickOutside = dropdownToggle.dataset.closeWhenClickOutside === "true";
  dropdownToggle.setAttribute("aria-haspopup", "true");
  dropdownToggle.setAttribute("aria-expanded", "false");

  var dropdownMenu = dropdownToggle.parentNode.querySelector(".dropdown-menu");

  dropdownMenu.setAttribute("aria-hidden", "true");

  function isOpen() {
    return dropdownToggle.getAttribute("aria-expanded") === "true";
  }

  function closeDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "false");
    dropdownMenu.setAttribute("aria-hidden", "true");
    dropdownToggle.parentNode.classList.remove("dropdown-on");
  }

  function openDropdown() {
    dropdownToggle.setAttribute("aria-expanded", "true");
    dropdownMenu.setAttribute("aria-hidden", "false");
    dropdownToggle.parentNode.classList.add("dropdown-on");
    dropdownMenu.children[0].focus();
  }

  function toggleDropdown() {
    if (isOpen()) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  dropdownToggle.onclick = toggleDropdown;

  if (startOpen) {
    openDropdown();
  }

  if (closeWhenClickOutside) {
    document.addEventListener("click", function (event) {
      var isClickInside = dropdownToggle.contains(event.target);

      if (!isClickInside && isOpen()) {
        closeDropdown();
      }
    });
  }
}
