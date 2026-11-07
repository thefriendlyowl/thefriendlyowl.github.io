/*
 * Site settings: change these in ONE place.
 * Links in the HTML already carry the same values as a fallback (so the site works without JavaScript);
 * this script keeps every page in sync with the values below.
 */
var SITE = {
  brand: 'The Friendly Owl',
  // Fillout form ID for the free paper analysis (the part after fillout.com/t/ in the share link).
  // When set, the form is shown inside the website (section #start) and every "Get my free paper analysis"
  // button scrolls to it. Leave empty to keep using the Google Form below.
  filloutId: '',
  // Google Form (fallback while filloutId is empty)
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd7H9h8vQdZ05kHGxzQ58__gGJom7AU5RpTnGGtokOtcam-9w/viewform',
  // WhatsApp number: country code + number, digits only (e.g. 919876543210). Leave empty until ready.
  whatsappNumber: '916361306106',
  whatsappText: "Hi, I'd like to know more about the free paper analysis.",
  sessionText: "Hi, I'd like to book a Focused Improvement Session.",
  sessionPrice: '₹199'
};

(function () {
  function wa(text) {
    if (!SITE.whatsappNumber) return null;
    return 'https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(text);
  }
  var slot = document.getElementById('fillout-slot');
  if (SITE.filloutId) {
    var onHome = !!slot;
    document.querySelectorAll('[data-link="form"]').forEach(function (a) {
      a.href = onHome ? '#start' : 'index.html#start'; a.removeAttribute('target'); a.removeAttribute('rel');
    });
    if (slot) {
      document.querySelectorAll('.gform-only').forEach(function (el) { el.hidden = true; });
      slot.hidden = false;
      var d = document.createElement('div');
      d.setAttribute('data-fillout-id', SITE.filloutId);
      d.setAttribute('data-fillout-embed-type', 'standard');
      d.setAttribute('data-fillout-inherit-parameters', '');
      d.setAttribute('data-fillout-dynamic-resize', '');
      d.style.width = '100%'; d.style.height = '640px';
      slot.appendChild(d);
      var s = document.createElement('script');
      s.src = 'https://server.fillout.com/embed/v1/'; s.async = true;
      document.body.appendChild(s);
    }
  } else {
    document.querySelectorAll('[data-link="form"]').forEach(function (a) {
      a.href = SITE.formUrl; a.target = '_blank'; a.rel = 'noopener';
    });
  }
  document.querySelectorAll('[data-link="whatsapp"], [data-link="session"]').forEach(function (a) {
    var url = wa(a.dataset.link === 'session' ? SITE.sessionText : SITE.whatsappText);
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
    else if (a.dataset.link === 'whatsapp') { a.hidden = true; }   // no number yet: hide WhatsApp buttons
  });
  document.querySelectorAll('[data-text="price"]').forEach(function (el) { el.textContent = SITE.sessionPrice; });
  document.querySelectorAll('[data-text="brand"]').forEach(function (el) { el.textContent = SITE.brand; });
})();
