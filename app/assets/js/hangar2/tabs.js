function deactivateTabs() {
  var tab = document.querySelector(".js-Tab.is-active");
  if (tab)
    tab.classList.remove("is-active");
  var tabContent = document.querySelector(".js-tab-content.is-active");
  if (tabContent)
    tabContent.classList.remove("is-active");
}

function activateTab(e) {
  e.preventDefault();
  deactivateTabs();
  this.classList.add("is-active");
  document.querySelector(this.getAttribute("href")).classList.add("is-active");
}

function initTabs(){
  const tabs = document.getElementsByClassName('js-Tab');
  for (var i = 0; i < tabs.length; i++){
    tabs[i].addEventListener("click", activateTab)
  }
}

initTabs();