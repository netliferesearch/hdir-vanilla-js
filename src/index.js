import "@babel/polyfill";
import "url-polyfill";
import 'nodelist-foreach-polyfill';
import "./polyfillRemove";
import { collapsible } from "./collapsible";
import { setParams, setInputValue, resetSearchParams } from "./filterToggler";
import { makeListExpandable } from "./expandableList";
import { generateToggleContent } from "./toggleContent";
import { requestFullscreen, exitFullscreen } from "./fullscreen";
import scrollToTitleFromUrlHash from './scrollToTitleFromUrlHash.js';

// Collapsible
const collapsableElements = [
  ...document.querySelectorAll(".b-collapsible__button")
];
collapsableElements.forEach(item => {
  item.addEventListener("click", collapsible, false);
});

// Looks at the url hash and collapse the collapsable with a match
if (collapsableElements.length) {
  // collapseFromUrl();
  setTimeout(function() {
    scrollToTitleFromUrlHash();
  }, 50);
}

const searchParams = new URLSearchParams(window.location.search);
// Search filter params
if (document.querySelector("#filterToggler")) {
  setInputValue(searchParams);

  // Creates listeners for the input-elements in the sidebar.
  const searchQueryElements = [
    ...document.querySelectorAll("#filterToggler input")
  ];
  searchQueryElements.forEach(element => {
    element.addEventListener("change", e => setParams(e, searchParams));
  });
}
// Reset filter button
if (document.querySelector("#resetFilter")) {
  document.querySelector("#resetFilter").addEventListener("click", e => {
    resetSearchParams(e, searchParams);
  });
}

// Makes lists with the js-expand-list class name expandable
const expandableLists = [...document.querySelectorAll(".js-expand-list")];
expandableLists.forEach(list => {
  makeListExpandable(list);
});


// Adds trigger for fullscreen iframe
const triggerFullscreen = [
  ...document.querySelectorAll("button[data-id='iframe-open']")
];
triggerFullscreen.forEach(item => {
  const target = document.getElementById(item.dataset.target);
  item.addEventListener("click", e => requestFullscreen(target));
});

// Trigger exit on esc press
document.addEventListener('mozfullscreenchange', () => toggleFullscreen(triggerFullscreen[0]));
document.addEventListener('webkitfullscreenchange', () => toggleFullscreen(triggerFullscreen[0]));
document.addEventListener('fullscreenchange', () => toggleFullscreen(triggerFullscreen[0]));
document.addEventListener('MSFullscreenChange', () => toggleFullscreen(triggerFullscreen[0]));
const toggleFullscreen = (item) => {
  if (!document.fullscreenElement && 
    	!document.webkitFullscreenElement && 
    	!document.mozFullScreenElement) {
        const target = document.getElementById(item.dataset.target);
        exitFullscreen(target);
  }
};

// Adds close btn for fullscreen iframe
const closeFullscreen = [
  ...document.querySelectorAll("button[data-id='iframe-close']")
];
closeFullscreen.forEach(item => {
  const target = document.getElementById(item.dataset.target);
  item.addEventListener("click", e => exitFullscreen(target));
});


// Profession picker
const professionPicker = document.getElementById('profession-picker');
if (professionPicker) {
  professionPicker.addEventListener("click", e => toggleProfessionPicker());
}

const toggleProfessionPicker = () => {
  const picker = document.getElementById('profession-picker__content');
  const selector = document.getElementById('profession-selector');
  if (!picker || !selector) {
    return;
  }
  picker.classList.toggle('hide');
  if (picker.classList.contains('hide')) {
    selector.setAttribute("aria-hidden", "true");
  }
  if (!picker.classList.contains('hide')) {
    selector.removeAttribute("aria-hidden");
  }
  if (picker.classList.contains('hide')) {
    picker.setAttribute("hidden", "");
  }
  if (!picker.classList.contains('hide')) {
    picker.removeAttribute("hidden");
  }
};

generateToggleContent();


// Definitions
const definitions = [
  ...document.querySelectorAll(".b-definition__button")
];
definitions.forEach(item => {
  item.addEventListener("click", e => toggleDefinition(item));
});

const toggleDefinition = (item) => {
  const target = document.getElementById(item.dataset.target);

  item.classList.toggle('active');
  target.classList.toggle('active');
};