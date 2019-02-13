import "@babel/polyfill";
import "url-polyfill";
import { collapsible, collapseFromUrl } from "./collapsible";
import { setParams, setInputValue, resetSearchParams } from "./filterToggler";
import { makeListExpandable } from "./expandableList";

// Collapsible
[...document.querySelectorAll(".b-collapsible__button")].forEach(item => {
  item.addEventListener("click", collapsible, false);
});

// Search filter params
if (document.querySelector("#filterToggler")) {
  const searchParams = new URLSearchParams(window.location.search);
  setInputValue(searchParams);

  // Creates listeners for the input-elements in the sidebar.
  const searchQueryElements = [
    ...document.querySelectorAll("#filterToggler input")
  ];
  searchQueryElements.forEach(element => {
    element.addEventListener("change", e => setParams(e, searchParams));
  });
}
// Reset filter button
if (document.querySelector("#resetFilter")) {
  document
    .querySelector("#resetFilter")
    .addEventListener("click", e => resetSearchParams(e, searchParams));
}

// Makes lists with the js-expand-list class name expandable
const expandableLists = [...document.querySelectorAll(".js-expand-list")];
expandableLists.forEach(list => {
  makeListExpandable(list);
});

// Looks at the url hash and collapse the collapsable with a match
if (expandableLists) {
  collapseFromUrl();
}
