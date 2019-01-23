function makeListExpandable(parent, max = 3) {
  // Hides elements after the max limit. Default = 3.
  parent.querySelectorAll("li").forEach((item, i) => {
    if (i >= max) {
      item.hidden = true;
      // Adds a class for animation when it is no longer hidden.
      item.classList.add("js-expand-list__extra-item");
    }
  });
  // Makes the button clickable, the number of
  // items are greater than max limit
  if (parent.querySelectorAll("li").length > max) {
    parent.querySelector("button").addEventListener("click", e => {
      showAllItems(parent);
      e.preventDefault();
      e.currentTarget.hidden = true;
    });
  }
  // Hide the button if we are hiding nothing
  else {
    parent.querySelector("button").hidden = true;
  }
}

function showAllItems(parent) {
  // Makes all items in the list not hidden.
  parent.querySelectorAll("li").forEach(item => {
    item.hidden = false;
  });
  parent.querySelector("button").hidden = true;
}

export { makeListExpandable };
