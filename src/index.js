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
import { setEqualHeights } from "../utils/setEqualHeights";

// Collapsible
const collapsableElements = [
  ...document.querySelectorAll(".b-collapsible__button")
];
collapsableElements.forEach(item => {
  item.addEventListener("click", collapsible, false);
  setEqualHeights(item);
});

// Looks at the url hash and collapse the collapsable with a match
if (collapsableElements.length) {
  // collapseFromUrl();
  setTimeout(function() {
    scrollToTitleFromUrlHash();
  }, 50);
}

// Skip link function
const skipLink = document.getElementById("skip");
if (skipLink) {
  skipLink.addEventListener("click", (e) => {
    e.preventDefault();
    const target = skipLink.href.split('#')[1];
    const targetElement = document.getElementById(target);
    targetElement.scrollIntoView();
    const nextLinkElement = targetElement.querySelectorAll('a');
    if (nextLinkElement) {
      nextLinkElement[0].focus();

    }
  });
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

// Toggle content button
const toggleElements = [
  ...document.querySelectorAll(".b-toggle-content")
];
toggleElements.forEach(el => {
  generateToggleContent(el);
});


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

// Collapsible tag toggle
const tagToggles = [
  ...document.querySelectorAll(".b-collapsible__tag")
];
tagToggles.forEach(item => {
  item.addEventListener("click", e => toggleTag(item));
});

const toggleTag = (item) => {
  const target = item.parentNode.querySelectorAll('.b-collapsible__tag-content')[0];
  item.classList.toggle('show');
  target.classList.toggle('show');
};

// Timeline dots classes
const timelines = [
  ...document.querySelectorAll(".b-timeline")
];
timelines.forEach(item => {
    const nr = item.querySelectorAll('.b-timeline__list')[0].childElementCount;
    if (nr === 4) {
      item.classList.add('b-timeline--four');
    }
    if (nr === 5) {
      item.classList.add('b-timeline--five');
    }
    if (nr === 6) {
      item.classList.add('b-timeline--six');
    }
});
};// Toggle content footer
const toggleContentFooter = btn => {
  const content = document.getElementById(btn.dataset.target);
  btn.classList.toggle("b-content-footer__btn--active");
  var ariaState =
    btn.getAttribute("aria-expanded") === "true" ? "false" : "true";
  btn.setAttribute("aria-expanded", ariaState);
  content.classList.toggle("b-content-footer__text--active");
};
const contentFooterTriggers = [
  ...document.querySelectorAll(".b-content-footer__btn")
];
contentFooterTriggers.forEach(btn => {
  btn.addEventListener("click", e => toggleContentFooter(btn));
});
