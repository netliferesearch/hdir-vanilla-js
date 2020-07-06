// When we have columns (pakkeforløp), the meta column is absolutely positioned. So we
// have to make sure the meta columns isn't longer than the content column. If so, make
// them equal.
export const setEqualHeights = (el) => {
  setTimeout(() => {

    // Skip if mobile
    if (window.innerWidth < 900) {
      return;
    }
    const mainDiv = el.parentNode;
    const hasColumns = mainDiv.classList.contains('b-collapsible--columns');
    const mainHeight = mainDiv.clientHeight;
    const contentDiv = el.parentNode.querySelectorAll('.b-collapsible__content')[0];
    const metaDiv = el.parentNode.querySelectorAll('.b-collapsible__meta-content')[0];
    const metaHeight = metaDiv ? metaDiv.scrollHeight : null;
    if (hasColumns && metaHeight > mainHeight) {
      contentDiv.style.minHeight = metaHeight - 150 + 'px';
    }
  }, 100);
};