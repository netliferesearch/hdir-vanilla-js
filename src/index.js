import "@babel/polyfill";
import Stickyfill from "../node_modules/stickyfilljs/dist/stickyfill";
import debounce from "lodash.debounce";
import { activeHeading } from "./scrollHint";
import { collapsible } from "./collapsible";
import { setParams, setInputValue } from "./filterToggler";

// Init stickyscroll polyfill
const elements = document.querySelectorAll(".b-nav-list--sticky");
Stickyfill.add(elements);

// Create listener on scrollHint
// Check if we got some body text and a sticky menu
if (
  document.querySelector(".t-body-text") &&
  document.querySelector(".b-nav-list--sticky ")
) {
  const navItems = document.querySelectorAll(
    ".b-nav-list--sticky > .b-nav-list__items > .b-nav-list__item--anchor"
  );
  const headings = document.querySelectorAll(".t-body-text > h2");
  // Only add the event listener if the number of nav list items and h2 headings match.
  if (navItems.length === headings.length) {
    window.addEventListener(
      "scroll",
      debounce(() => {
        activeHeading(headings, navItems, window.pageYOffset);
      }, 16.66) // 16.66ms is 60fps
    );
  }
}

// Collapsible
[...document.querySelectorAll(".b-collapsible__button")].forEach(item => {
  item.addEventListener("click", collapsible, false);
});

// Search filter params
if (document.querySelector("#filterToggler")) {
  const searchParams = new URLSearchParams(window.location.search);
  setInputValue(searchParams);

  // Creates listeners for the input-elements in the sidebar.
  const searchQueryElements = document.querySelectorAll("#filterToggler input");
  searchQueryElements.forEach(element => {
    element.addEventListener("change", e => setParams(e, searchParams));
  });
}
