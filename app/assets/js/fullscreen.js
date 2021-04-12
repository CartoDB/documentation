document.querySelectorAll("[data-fullscreen-button]").forEach(setupFullscreen);

function fullscreenSupported() {
  return (
    document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled
  );
}

function fullscreen(iframe) {
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.mozRequestFullScreen) {
    iframe.mozRequestFullScreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}

function setupFullscreen(button) {
  var targetId = button.dataset.target || "";
  var iframe = document.querySelectorAll(
    `[data-fullscreen-target-id=${targetId}]`
  )[0];

  if (!button) {
    console.error("Fullscreen button not found.");
    return;
  }

  if (!iframe) {
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
    fullscreen(iframe);
  });
}
