import jsdom from 'jsdom';
import { collapsible } from "./collapsible";
import mockDocumentHTML from './collapsible.mockDOM';

const { JSDOM } = jsdom;
const { document } = (new JSDOM(mockDocumentHTML)).window;

delete global.window.location;
delete global.document;
global.document = document;

describe('collapsible', () => {
  // Collapsible
  const collapsableElements = [
    ...document.querySelectorAll(".b-collapsible__button")
  ];
  collapsableElements.forEach(item => {
    item.addEventListener("click", collapsible, false);
  });
  // Actual test
  const el = collapsableElements[1]; // To test other elements, change the number here
  const subheadingEl = el.parentElement.querySelectorAll(".b-collapsible__meta-heading")[0];
  const subheadingElCollapsible = el.parentElement.querySelectorAll(".b-collapsible__subheading-collapsible")[0];

  describe('Mock click event on 2nd "collapsible" element, and check for classes', () => {
    describe('before click (collapsed/initial)', () => {
      it('collapsed/initial - element does not have class set by a click', () => {
        expect(el.classList.contains('b-collapsible__button--active')).toBe(false);
      });
      describe('elements have the expected initial attributes', () => {
        it('collapsed/initial - element "aria-expanded" attribute is set to "false"', () => {
          expect(el.getAttribute("aria-expanded")).toBe("false");
        });
        it('collapsed/initial - subheadingEl does not have the "hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.hasAttribute("hidden")).toBe(false);
          }
        });
        it('collapsed/initial - subheadingEl does not have the "aria-hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.getAttribute("aria-hidden")).toBe(null);
          }
        });
        it('collapsed/initial - subheadingEl has no "display" style set', () => {
          if (subheadingEl) {
            expect(subheadingEl.style.display).toBe("");
          }
        });
        it('collapsed/initial - subheadingElCollapsible has the "hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.hasAttribute("hidden")).toBe(true);
          }
        });
        it('collapsed/initial - subheadingElCollapsible has the "aria-hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.getAttribute("aria-hidden")).toBe("true");
          }
        });
        it('collapsed/initial - subheadingElCollapsible got the "display: none" style', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.style.display).toBe("none");
          }
        });
      });
    });
    describe('1st click (expanded)', () => {
      it('expanded - element does have class set by a click', () => {
        el.click(); // expand
        expect(el.classList.contains('b-collapsible__button--active')).toBe(true);
      });
      describe('elements have got new attributes', () => {
        it('expanded - element "aria-expanded" attribute is set to "true"', () => {
          expect(el.getAttribute("aria-expanded")).toBe("true");
        });
        it('expanded - subheadingEl got the "hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.hasAttribute("hidden")).toBe(true);
          }
        });
        it('expanded - subheadingEl got the "aria-hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.getAttribute("aria-hidden")).toBe("true");
          }
        });
        it('expanded - subheadingEl got the "display: none" style', () => {
          if (subheadingEl) {
            expect(subheadingEl.style.display).toBe("none");
          }
        });
        it('expanded - subheadingElCollapsible lost the "hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.hasAttribute("hidden")).toBe(false);
          }
        });
        it('expanded - subheadingElCollapsible lost the "aria-hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.getAttribute("aria-hidden")).toBe(null);
          }
        });
        it('expanded - subheadingElCollapsible got the "display: block" style', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.style.display).toBe("block");
          }
        });
      });
    });
    describe('2nd click (collapsed)', () => {
      it('collapsed - element does not have class set by a click', () => {
        el.click(); // collapse
        expect(el.classList.contains('b-collapsible__button--active')).toBe(false);
      });
      describe('elements have got new attributes', () => {
        it('collapsed - element "aria-expanded" attribute is set to "false"', () => {
          expect(el.getAttribute("aria-expanded")).toBe("false");
        });
        it('collapsed - subheadingEl does not have the "hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.hasAttribute("hidden")).toBe(false);
          }
        });
        it('collapsed - subheadingEl does not have the "aria-hidden" attribute', () => {
          if (subheadingEl) {
            expect(subheadingEl.getAttribute("aria-hidden")).toBe(null);
          }
        });
        it('collapsed - subheadingEl has no "display" style set', () => {
          if (subheadingEl) {
            expect(subheadingEl.style.display).toBe("block");
          }
        });
        it('collapsed - subheadingElCollapsible has the "hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.hasAttribute("hidden")).toBe(true);
          }
        });
        it('collapsed - subheadingElCollapsible has the "aria-hidden" attribute', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.getAttribute("aria-hidden")).toBe("true");
          }
        });
        it('collapsed - subheadingElCollapsible got the "display: none" style', () => {
          if (subheadingElCollapsible) {
            expect(subheadingElCollapsible.style.display).toBe("none");
          }
        });
      });
    });
  });
});
