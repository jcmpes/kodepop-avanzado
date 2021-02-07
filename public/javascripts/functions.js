// Create slider
const slider = document.getElementById('slider');
const START_MIN_PRICE = 20;
const START_MAX_PRICE = 80;

// Get params to create slider
// according to query string params
const qs = (function(a) {
  if (a == '') return {};
  const b = {};
  for (let i = 0; i < a.length; ++i) {
    const p=a[i].split('=', 2);
    if (p.length == 1) {
      b[p[0]] = '';
    } else {
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
  }
  return b;
})(window.location.search.substr(1).split('&'));

// Actually create the slider
noUiSlider.create(slider, {
  start: [qs['gt'] || START_MIN_PRICE, qs['lt'] || START_MAX_PRICE],
  snap: true,
  connect: true,
  range: {
    'min': 0,
    '10%': 50,
    '20%': 100,
    '30%': 150,
    '40%': 500,
    '50%': 800,
    'max': 1000,
  },
});

// Make prices and type selector add filters to prospect 
// GET request by adding query params to Submit anchor link 
const linkFilter = document.querySelector('#link-filter');
const select = document.querySelector('#select');
const snapValues = [
  document.querySelector('#slider-snap-value-lower'),
  document.querySelector('#slider-snap-value-upper'),
];

// Control behaviour of select field on page load
// Control behaviour of slider on page load
window.onload = () => {
  select.value = qs["type"] || "Venta";
  snapValues[0].innerHTML = qs['gt'] || START_MIN_PRICE;
  snapValues[1].innerHTML = qs['lt'] || START_MAX_PRICE;
};

// Update selected type of ads
select.addEventListener('change', () => {
  linkFilter.href += `&type=${select.value}`;
})

// Update min and max price values
slider.noUiSlider.on('update', function(values, handle) {
  snapValues[handle].innerHTML = values[handle];
  linkFilter.href = `/filters?lt=${values[1]}&gt=${values[0]}`;
});

// Make GET request from slider values
const btnFilter = document.querySelector('#btn-filter');
