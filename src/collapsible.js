import zenscroll from "zenscroll";

function collapsible(e) {
  const element = e.currentTarget;
  const expanded =
    element.getAttribute("aria-expanded") === "true" ? true : false;
  // Toggle expanded value
  element.setAttribute("aria-expanded", String(!expanded));

  // Toggle active modifier class
  const elemClasses = element.classList;
  if (elemClasses.contains("b-collapsible__button--active")) {
    elemClasses.remove("b-collapsible__button--active");
  } else {
    elemClasses.add("b-collapsible__button--active");
  }

  const content = document.getElementById(
    element.getAttribute("aria-controls")
  );
  toggleContent(content, expanded);
}

function findWrapper(child) {
  // If the parent is the component wrapper, then return it, so we can scroll it into view later.
  // If it is a child, then just return itself.
  if (child.parentElement.getAttribute("class") === "b-collapsible") {
    return child.parentElement;
  } else {
    return child;
  }
}

function collapseFromUrl() {
  // Takes hash from URL, uses it as an ID selector and runs the expand function.
  if (window.location.hash) {
    const id = window.location.hash.slice(1, window.location.hash.length);
    const element = document.getElementById(id);
    const button = document.querySelector(`button[aria-controls=${id}]`);
    toggleContent(element);
    button.setAttribute("aria-expanded", "true");
  }
}

function toggleContent(content, expanded) {
  if (expanded) {
    content.setAttribute("hidden", "");
    content.setAttribute("aria-hidden", "");
  } else {
    content.removeAttribute("hidden");
    content.removeAttribute("aria-hidden", "");
  }
  // Animates the scroll to the element, making sure the top of the expanding area is in the window view
  zenscroll.intoView(findWrapper(content), 300);
}

export { collapsible, collapseFromUrl };
