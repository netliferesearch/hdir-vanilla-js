function activeHeading(headings, navItems, scrollPos) {
  // Makes the nodeList to an array of htmlElements
  const htmlHeadings = [].slice.call(headings);
  const prescrolledItems = htmlHeadings.filter(
    // 20px gives us some headroom above the heading, so it always becomes active when linked to
    h => h.offsetTop < scrollPos + 20
  );

  if (prescrolledItems.length) {
    // Finds the last item we scrolled past
    toggleActiveNavClass(
      navItems,
      htmlHeadings.indexOf(prescrolledItems[prescrolledItems.length - 1])
    );
  }
}

function toggleActiveNavClass(navItems, index) {
  // Clean up
  Array.from(navItems).forEach(item =>
    item.classList.remove("b-nav-list__link--active")
  );
  navItems[index].classList.add("b-nav-list__link--active");
}

export { activeHeading, toggleActiveNavClass };
