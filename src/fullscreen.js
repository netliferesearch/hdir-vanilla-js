const requestFullscreen = function (ele) {
  ele.classList.add('videoWrapper__fullscreen');
  if (!document.fullscreenElement && ele.requestFullscreen) {
    ele.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else if (!document.fullscreenElement && ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (!document.fullscreenElement && ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (!document.fullscreenElement && ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
};

const exitFullscreen = function (ele) {
  ele.classList.remove('videoWrapper__fullscreen');
  // Check if fullscreen is actually activated (if user pressed ESC, it may not be)
  if (!document.fullscreenElement && 
    	!document.webkitFullscreenElement && 
    	!document.mozFullScreenElement) {
    return null;
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else {
    console.log('Fullscreen API is not supported.');
  }
};

export { requestFullscreen, exitFullscreen };