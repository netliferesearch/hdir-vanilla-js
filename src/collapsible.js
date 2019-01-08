function collapsible(e) {
  const expanded =
    e.currentTarget.getAttribute("aria-expanded") === "true" ? true : false;
  // Toggle expanded value
  e.currentTarget.setAttribute("aria-expanded", String(!expanded));

  // Toggle active modifier class
  const elemClasses = e.currentTarget.classList;
  if (elemClasses.contains("b-collapsible__button--active")) {
    elemClasses.remove("b-collapsible__button--active");
  } else {
    elemClasses.add("b-collapsible__button--active");
  }

  const ariaControls = e.currentTarget.getAttribute("aria-controls");
  toggleContent(ariaControls, expanded);
}

function toggleContent(ariaControls, expanded) {
  const content = document.getElementById(ariaControls);
  expanded
    ? content.setAttribute("hidden", "")
    : content.removeAttribute("hidden");

  content.setAttribute("aria-hidden", String(expanded));
}

export { collapsible };
