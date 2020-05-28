import zenscroll from "zenscroll";

function hideElement(el) {
  el.setAttribute("hidden", "");
  el.setAttribute("aria-hidden", "true");
  el.style.display = "none";
}

function showElement(el) {
  el.removeAttribute("hidden");
  el.removeAttribute("aria-hidden");
  el.style.display = "block";
}

function collapsible(e) {
  let theParent = null;
  const element = e.currentTarget;
  const targetID = element.getAttribute("aria-controls");
  const targetElement = document.getElementById(targetID);
  
  // --- Subheading handling ---

  // "Show me your parents and I will tell who you are" – some wise fellow
  theParent = element.parentElement;

  // If footer button was clicked, we have a different parent
  if (theParent.classList.contains("b-collapsible__footer")) {
    theParent = element.parentElement.parentElement;
  }

  // Toggle active collapsible class on 'collapsible' button
  const allButtons = theParent.querySelectorAll(`.b-collapsible__button[aria-controls="${targetID}"]`);
  allButtons.forEach(button => {
    const expanded =
      button.getAttribute("aria-expanded") === "true" ? true : false;
    // Toggle expanded value
    button.setAttribute("aria-expanded", String(!expanded));
    const elemClasses = button.classList;
    if (elemClasses.contains("b-collapsible__button--active")) {
      elemClasses.remove("b-collapsible__button--active");
    } else {
      elemClasses.add("b-collapsible__button--active");
    }
    toggleContent(targetElement, expanded, element);
  });

  // The subheading element that renders as a 'p' tag, non-clickable
  const subheadingEl = theParent.querySelectorAll(".b-collapsible__meta-heading")[0];
  // The subheading element that renders as a 'div', containing the nested collapsible markup
  const subheadingElCollapsible = theParent.querySelectorAll(".b-collapsible__subheading-collapsible")[0];
  
  // We want to add active state to the parent as well 
  if (theParent.classList.contains("b-collapsible--active")) {
    theParent.classList.remove("b-collapsible--active");
  } else {
    theParent.classList.add("b-collapsible--active");
    if (history.pushState) {
      history.pushState(null, null, `#${targetID}`);
    }
    else {
      location.hash = `#${targetID}`;
    }
  }

  if (subheadingEl && subheadingElCollapsible) {
    if (expanded) {
      hideElement(subheadingElCollapsible);
      showElement(subheadingEl);
    } else {
      hideElement(subheadingEl);
      showElement(subheadingElCollapsible);
    }
  }
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

function toggleContent(content, expanded, el) {
  if (!content) {
    return;
  }
  if (expanded) {
    content.setAttribute("hidden", "");
    content.setAttribute("aria-hidden", "true");
  } else {
    content.removeAttribute("hidden");
    content.removeAttribute("aria-hidden");
  }
  // Animates the scroll to the element, making sure the top of the expanding area is in the window view
  if (!expanded) {
    zenscroll.setup(null, 10);
    setTimeout(() => {
      zenscroll.to(findWrapper(el));
    }, 200);
  }
}

export { collapsible };
