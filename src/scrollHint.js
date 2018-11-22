function activeHeading(headings, navItems, scrollPos) {
  // 20px gives us some headroom above the heading, so it always becomes active when linked to
  const headingSpace = 20;

  // Makes the nodeList to an array of htmlElements
  const htmlHeadings = [].slice.call(headings);
  const scrolledPastItems = htmlHeadings.filter(
    h => h.offsetTop < scrollPos + headingSpace
  );
  // Removes the active classes if we have not scrolled to a heading yet.
  if (!scrolledPastItems.length) {
    toggleActiveNavClass(navItems);
    return;
  }

  if (scrolledPastItems.length) {
    // Finds the last item we scrolled past
    toggleActiveNavClass(
      navItems,
      htmlHeadings.indexOf(scrolledPastItems[scrolledPastItems.length - 1])
    );
  }
}

function toggleActiveNavClass(navItems, index) {
  // Clean up
  Array.from(navItems).forEach(item =>
    item.classList.remove("b-nav-list__link--active")
  );
  // Only add the class if we have an index
  index !== undefined &&
    navItems[index].classList.add("b-nav-list__link--active");
}

export { activeHeading, toggleActiveNavClass };
