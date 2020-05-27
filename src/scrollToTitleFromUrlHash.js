/* eslint-disable no-restricted-globals */
import zenscroll from "zenscroll";

// Get fragment from url
const getFragment = url => {
  const i = url.lastIndexOf('#');
  if (i !== -1) {
    return url.substr(i).replace('#', '');
  }
};

export default function scrollToTitleFromUrlHash() {
  const url = window.location.href;
  const lastHash = getFragment(url);
  // If there is no hash in url return and do nothing
  if (!lastHash) return false;

  // Find hash in document and scroll to that title (h2)
  waitForIt(`#${lastHash}`)
    .then((el) => {
      return (el) ? handleTarget(el) : false;
    })
    .catch((err) => err);
  return lastHash; // For test
}

// Helpers
const isCollapsible = (el) => el.classList.contains('b-collapsible__content');
const getCollapsibleTrigger = (el) => el.parentNode.querySelector('button');
const getHeading = (targetID) => document.querySelectorAll(`.b-collapsible__button[aria-controls="${targetID}"]`);

// Traverse the DOM, starting from element, moving upwards
const traverseCollapsibles = (el) => {
  let elements = [];
  while (el = el.parentElement) { // go up till <html>
    if (el.classList.contains('b-collapsible')) {
      const collapsibleButton = el.querySelectorAll(`button[aria-controls]`)[0];

      // Skip already opened elements (behandling)
      if (!collapsibleButton.classList.contains('b-collapsible__button--active')) {
        elements.push(collapsibleButton);
      }
    }
  }
  return elements;
};

const handleTarget = (el) => {
  if (!el) {
    return;
  }
  const isCollapsbile = isCollapsible(el);

  // Normal heading, not Collapsible
  if (!isCollapsbile) {
    el.scrollIntoView(true);
    return;
  }

  // Missing trigger
  if (!getCollapsibleTrigger(el)) {
    return;
  }

  // Traverse and open collapsibles
  // We first reverse the array, so the outer collapsibles are opened first, then the innermost.
  // Also, checking if the current button (trigger) is already opened by default. If so, skip.
  // traverseCollapsibles(el).reverse().forEach(collapsible => console.log('click ', collapsible));
  traverseCollapsibles(el).reverse().forEach(collapsible => collapsible.click());
  
  // Scroll to element
  const heading = getHeading(el.id)[0];
  zenscroll.setup(null, 0);
  zenscroll.to(heading);

  return;
};

// sleep helper to make the check again after some time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Checks if element exists in document
async function waitForIt(selector, retries = 5) {
  try {
    // Find element
    const element = document.querySelector(selector);
    console.log(selector);
    // Return if element exists
    if (element) {
      return element;
    }
    // Try to find element with 5 tries
    if (retries) {
      await sleep(50 * retries);
      return waitForIt(selector, retries - 1);
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}
