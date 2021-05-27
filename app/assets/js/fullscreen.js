document.querySelectorAll("[data-fullscreen-button]").forEach(setupFullscreen);

function fullscreenSupported() {
  return (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
}

function fullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function setupFullscreen(button) {
  var isFullscreen = false;
  var targetId = button.dataset.target || "";
  var element = document.querySelectorAll(
    `[data-fullscreen-target-id=${targetId}]`
  )[0];

  if (!button) {
    console.error("Fullscreen button not found.");
    return;
  }

  if (!element) {
    console.error(`Fullscreen target ${targetId} not found.`);
    button.style.display = "none";
    return;
  }

  if (!fullscreenSupported()) {
    console.error(`Browser doesn't support fullscreen.`);
    button.style.display = "none";
    return;
  }

  button.addEventListener("click", function () {
    isFullscreen = !isFullscreen;
    if (isFullscreen) {
      fullscreen(element);
    } else {
      document.exitFullscreen()
    }
  });
}
