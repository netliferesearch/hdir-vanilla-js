export const generateToggleContent = () => {
  const wrapper = document.querySelector('.b-toggle-content');
  const textContent = document.querySelector('.b-toggle-content__text');

  // Use toggle mode when over 400 chars
  if (wrapper && textContent && textContent.innerHTML.length > 500) {
    wrapper.classList.add('toggle-mode');
  }

  // When there is no content, show all the text
  // (we specify what type of content to avoid false positives)
  const articleWrapper = document.querySelector('.l-article');
  if (articleWrapper) {
    const recommendations = Array.apply(null, articleWrapper.querySelectorAll('.b-collapsible'));
    const chapterHeadings = Array.apply(null, articleWrapper.querySelectorAll('.b-chapter-heading--link'));
    const items = recommendations.concat(chapterHeadings);

    if (items.length === 0) {
      wrapper.classList.remove('toggle-mode');
    }
  }
};