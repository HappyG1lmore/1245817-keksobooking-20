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
  window.backend.loadAdverts(
      function (data) {
        window.appState.advertsData = data;
        window.pin.renderPins(data);
      }
  );
  window.map.mainMap.addEventListener('click', onMapClick);
};

var disableApp = function () {
  window.pin.removePins();
  window.pin.movesPinDefault();
  window.isAppActive = false;
  window.form.disableAdForm();
  window.map.mainMap.classList.add('map--faded');
  window.form.setAddress();
  window.map.mainMap.removeEventListener('click', onMapClick);
};

var onMapClick = function (evt) {
  var pin = evt.target.closest('.map__pin');

  if (pin && !pin.classList.contains('map__pin--main') && !pin.classList.contains('map__pin--active')) {
    pin.classList.add('map__pin--active');
    window.card.renderCard(window.appState.advertsData[pin.dataset.id], pin);
  }
};

var onPinMouseClick = function (evt) {
  if (window.utils.isMouseLeftPressed(evt)) {
    enableApp();
  }
};

var onPinEnterPress = function (evt) {
  if (window.utils.isEnterPressed(evt)) {
    enableApp();
  }
};

var onSuccesSubmit = function () {
  disableApp();
  window.form.showSuccessPopup();
};

var onErrorSubmit = function () {
  window.form.showErrorPopup();
};

window.map.mainPin.addEventListener('mousedown', onPinMouseClick);
window.map.mainPin.addEventListener('keydown', onPinEnterPress);

var clickClick = function (evt) {
  if (window.utils.isMouseLeftPressed(evt)) {
    console.log('Событие по клику для тренировки, УДАЛЮ СКОРО');
  }
};
document.addEventListener('click', clickClick);

window.form.adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var formData = new FormData(window.form.adForm);
  window.backend.uploadAdvert(onSuccesSubmit, onErrorSubmit, formData);
});

initApp();
