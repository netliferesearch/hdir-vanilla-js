const requestFullscreen = function (ele) {
  ele.classList.add('videoWrapper__fullscreen');
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
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