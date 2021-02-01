export const generateToggleContent = (el) => {
  const wrapper = el;
  const textContent = el.querySelector('.b-toggle-content__text');
  const textLength = textContent ? textContent.innerText.replace(/(<([^>]+)>)/ig, "") : '';
  const articleWrapper = el.parentNode.classList.contains('l-article');
  console.log('articleWrapper', articleWrapper);

  // Not intro text, set char limit to 250
  if (!articleWrapper && wrapper && textContent && textLength.length > 250) {
    wrapper.classList.add('toggle-mode');
  }

  // Article intro, set char limit to 500
  if (articleWrapper && wrapper && textContent && textLength.length > 500) {
    wrapper.classList.add('toggle-mode');
  }


  // When there is no other content in the article, show all the text
  // (we specify what type of content to avoid false positives)
  if (articleWrapper) {
    const article = document.querySelector('.l-article');
    const recommendations = Array.apply(null, article.querySelectorAll('.b-collapsible'));
    const chapterHeadings = Array.apply(null, article.querySelectorAll('.b-chapter-heading--link'));
    const items = recommendations.concat(chapterHeadings);

    if (items.length === 0) {
      wrapper.classList.remove('toggle-mode');
    }
  }
};