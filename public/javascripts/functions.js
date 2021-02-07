// Create slider
const slider = document.getElementById('slider');

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
  start: [qs['gt'] || 20, qs['lt'] || 80],
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

// Update min and max values
const snapValues = [
  document.querySelector('#slider-snap-value-lower'),
  document.querySelector('#slider-snap-value-upper'),
];

window.onload = () => {
  snapValues[0].innerHTML = qs['gt'];
  snapValues[1].innerHTML = qs['lt'];
};

const linkFilter = document.querySelector('#link-filter');

slider.noUiSlider.on('update', function(values, handle) {
  snapValues[handle].innerHTML = values[handle];
  inkFilter.href = `/filters?lt=${values[1]}&gt=${values[0]}`;
});

// Make GET request from slider values
const btnFilter = document.querySelector('#btn-filter');
