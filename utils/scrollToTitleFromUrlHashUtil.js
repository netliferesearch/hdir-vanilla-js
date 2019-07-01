import getFragment from './getUrlFragmentUtil';

export default function scrollToTitleFromUrlHash() {
  const url = window.location.href;
  const lastHash = getFragment(url);
  // If there is no hash in url return and do nothing
  if (!lastHash) return false;
  // Find hash in document and scroll to that title (h2)
  waitForIt(`#${lastHash}`)
    .then((el) => {
      return (el) ? el.scrollIntoView() : false;
    })
    .catch((err) => err);
  return lastHash; // For test
}

// sleep helper to make the check again after some time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Checks if element exists in document
async function waitForIt(selector, retries = 5) {
  try {
    // Find element
    const element = document.querySelector(selector);
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
