import "@babel/polyfill";
import Stickyfill from "../node_modules/stickyfilljs/dist/stickyfill";
import { activeHeading } from "./scrollHint";

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
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;

      activeHeading(headings, navItems, scrollPosition);
    });
  }
}
