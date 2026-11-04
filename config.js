/*
 * Site settings: change these in ONE place.
 * Links in the HTML already carry the same values as a fallback (so the site works without JavaScript);
 * this script keeps every page in sync with the values below.
 */
var SITE = {
  brand: 'The Next Mark',
  // Google Form for the free paper analysis
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd7H9h8vQdZ05kHGxzQ58__gGJom7AU5RpTnGGtokOtcam-9w/viewform',
  // WhatsApp number: country code + number, digits only (e.g. 919876543210). Leave empty until ready.
  whatsappNumber: '',
  whatsappText: "Hi, I'd like to know more about the free paper analysis.",
  sessionText: "Hi, I'd like to book a Focused Improvement Session.",
  sessionPrice: '₹199'
};

(function () {
  function wa(text) {
    if (!SITE.whatsappNumber) return null;
    return 'https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(text);
  }
  document.querySelectorAll('[data-link="form"]').forEach(function (a) {
    a.href = SITE.formUrl; a.target = '_blank'; a.rel = 'noopener';
  });
  document.querySelectorAll('[data-link="whatsapp"], [data-link="session"]').forEach(function (a) {
    var url = wa(a.dataset.link === 'session' ? SITE.sessionText : SITE.whatsappText);
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else if (a.dataset.link === 'whatsapp') { a.hidden = true; }   // no number yet: hide WhatsApp buttons
  });
  document.querySelectorAll('[data-text="price"]').forEach(function (el) { el.textContent = SITE.sessionPrice; });
  document.querySelectorAll('[data-text="brand"]').forEach(function (el) { el.textContent = SITE.brand; });
})();
