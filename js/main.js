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
  window.pin.renderPins(window.backend.load);
  window.map.mainMap.addEventListener('click', onMapClick);
};

var onMapClick = function (evt) {
  var pin = evt.target.closest('.map__pin');

  if (pin && !pin.classList.contains('map__pin--main') && !pin.classList.contains('map__pin--active')) {
    pin.classList.add('map__pin--active');
    window.card.renderCard(window.backend.load[pin.dataset.id], pin);
  }
};
  // а как добавить атрибут информации с бэкенда? нам айдишники нужны

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
