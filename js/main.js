'use strict';

var initApp = function () {
  window.form.disableAdForm();
  window.form.setAddress();
};

var enableApp = function () {
  if (window.isAppActive) {
    return;
  }
  window.isAppActive = true;
  window.form.enableAdForm();
  window.map.mainMap.classList.remove('map--faded');
  window.form.setAddress();
  window.pin.renderPins(window.data.announcements);
  window.map.mainMap.addEventListener('click', onMapClick);
};

var onMapClick = function (evt) {
  var closestPin = evt.target.closest('.map__pin');

  if (closestPin && !closestPin.classList.contains('map__pin--main')) {
    window.card.renderCard(window.data.announcements[closestPin.dataset.id]);
  }
};

window.map.mainPin.addEventListener('mousedown', function (evt) {
  if (window.utils.isMouseLeftPressed(evt)) {
    enableApp();
  }
});

window.map.mainPin.addEventListener('keydown', function (evt) {
  if (window.utils.isEnterPressed(evt)) {
    enableApp();
  }
});


initApp();
