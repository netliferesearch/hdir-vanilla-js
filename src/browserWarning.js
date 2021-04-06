export const browserWarning = () => {
  // Get elements
  const ieWarninElement = document.getElementById('js_ie-warning');
  const ieWarninElementText = document.getElementById('js_ie_warning_text');

  if (!ieWarninElement || !ieWarninElementText) {
    return;
  }
  // Get userAgent
  const ua = window.navigator.userAgent;
  const isIeBrowser = ua.match(/MSIE|Trident/) !== null;
  const msie = ua.indexOf('MSIE '); // IE 10 or older
  const trident = ua.indexOf('Trident/'); // IE 11
  // IF ie 10 or older, set text accordingly
  if (msie !== -1) {
    ieWarninElementText.innerHTML = "Din nettleser: Microsoft Internet Explorer v.10 eller eldre"
  }
  // IF ie 11, set text accordingly
  if (trident !== -1) {
    ieWarninElementText.innerHTML = "Din nettleser: Microsoft Internet Explorer v.11"
  }
  // Set display to block IF using IE 11 or older
  if (isIeBrowser) ieWarninElement.classList.toggle('hide');
};