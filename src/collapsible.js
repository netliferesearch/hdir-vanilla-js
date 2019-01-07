function collapsible(e) {
  const expanded =
    e.currentTarget.getAttribute("aria-expanded") === "true" ? true : false;
  // Toggle expanded value
  e.currentTarget.setAttribute("aria-expanded", String(!expanded));

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
