function makeListExpandable(parent, max = 3) {
  const startLimit = parent.getAttribute("data-start-limit")
    ? Number(parent.getAttribute("data-start-limit"))
    : max;
  // Hides elements after the max limit. Default = 3.
  [...parent.querySelectorAll("li")].forEach((item, i) => {
    if (i >= startLimit) {
      item.hidden = true;
      // Adds a class for animation when it is no longer hidden.
      item.classList.add("js-expand-list__extra-item");
    }
  });
  // Makes the button clickable, the number of
  // items are greater than start limit
  if (parent.querySelectorAll("li").length > startLimit) {
    parent.querySelector("button").addEventListener("click", e => {
      if (e.currentTarget.getAttribute("data-expanded")) {
        e.preventDefault();
        e.currentTarget.removeAttribute("data-expanded");
        e.currentTarget.innerText = e.currentTarget.getAttribute(
          "data-expand-text"
        );
        hideExpandedItems(parent, max);
      } else {
        showAllItems(parent);
        e.preventDefault();
        e.currentTarget.setAttribute("data-expanded", "true");
        e.currentTarget.setAttribute(
          "data-expand-text",
          e.currentTarget.innerText
        );
        e.currentTarget.innerText = "Vis færre";
      }
    });
  }
  // Removes the button if we don't need it
  else {
    parent.querySelector("button").hidden = true;
  }
}

function showAllItems(parent) {
  // Makes all items in the list not hiddenm and removes the button.
  [...parent.querySelectorAll("li")].forEach(item => {
    item.hidden = false;
  });
}

function hideExpandedItems(parent, max = 3) {
  const startLimit = parent.getAttribute("data-start-limit")
    ? Number(parent.getAttribute("data-start-limit"))
    : max;

  [...parent.querySelectorAll("li")].forEach((item, index) => {
    if (index > startLimit - 1) {
      item.hidden = true;
    }
  });
}

export { makeListExpandable };
