// This script is used on the search result page, in the sidebar.
// It checks checkboxes and radio buttons, and makes a new request when they are changed.

function setParams(event, searchParams) {
  const targetName = event.target.getAttribute("name");
  const targetValue = event.target.value;
  const targetType = event.target.getAttribute("type");
  const isChecked = event.target.checked;

  // Adds all params, with this name, to an array
  const targetNameParams = searchParams.getAll(targetName);

  // Removes all the params, of this name
  searchParams.delete(targetName);

  // Removes the item from the array if we unchecked the checkbox.
  if (!isChecked) {
    targetNameParams
      .filter(param => param !== targetValue)
      .forEach(param => {
        searchParams.append(targetName, param);
      });
  }
  // If got a radio input type, we use set to make it get only one value
  else if (targetType === "radio") {
    searchParams.set(targetName, targetValue);
  }
  // It will add it to the list, and remove any duplicates.
  else {
    [...new Set([...targetNameParams, targetValue])].forEach(param => {
      searchParams.append(targetName, param);
    });
  }

  const location = window.location.href.slice(
    0,
    window.location.href.indexOf("?")
  );
  // Adds queries to a URL object, then it goes to the new URL
  const updatedUrlParams = new URL(`${location}?${searchParams.toString()}`);
  window.location = updatedUrlParams.toString();
}

// Reads the URL and checks the input-elements. Checkbox and radio buttons are the only supported types.
function setInputValue(params) {
  [...params].forEach(x => {
    // Creates a CSS-selector based on the URL parameters, and makes sure it exists.
    const elem = document.querySelector(
      `form input[name~="${x[0]}"][value~="${x[1]}"]`
    );
    if (elem) elem.checked = true;
  });
}

// Resets all search/filter params
function resetSearchParams(e, searchParams) {
  const categories = [
    ...new Set(
      [...document.querySelectorAll("#searchQueries input")].map(x =>
        x.getAttribute("name")
      )
    )
  ];
  categories.forEach(x => {
    searchParams.delete(x);
  });

  const location = window.location.href.slice(
    0,
    window.location.href.indexOf("?")
  );

  const updatedUrlParams = new URL(`${location}?${searchParams.toString()}`);
  window.location = updatedUrlParams.toString();
}

export { setParams, setInputValue, resetSearchParams };
