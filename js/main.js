'use strict';

var initApp = function () {
  window.form.disableAdForm();
  window.form.setAddress();
};

var enableApp = function () {
  if (window.appState.isAppActive) {
    return;
  }
  window.appState.isAppActive = true;
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
  window.pin.resetMainPinPosition();
  window.appState.isAppActive = false;
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

var onPopupMouseLeftPressed = function (evt) {
  if (window.utils.isMouseLeftPressed(evt)) {
    if (event.target.tagName !== 'P' || event.target.classList.contains('error__button')) {
      window.popups.removePopup();
    }
  }
};

var onPopupEscPress = function (evt) {
  if (window.utils.isEscPressed(evt)) {
    window.popups.removePopup();
  }
};

var onSuccesSubmit = function () {
  disableApp();
  window.popups.showSuccessPopup();
  document.addEventListener('click', onPopupMouseLeftPressed);
  document.addEventListener('keydown', onPopupEscPress);
};

var onErrorSubmit = function () {
  window.popups.showErrorPopup();
  document.addEventListener('click', onPopupMouseLeftPressed);
  document.addEventListener('keydown', onPopupEscPress);
};

window.map.mainPin.addEventListener('mousedown', onPinMouseClick);
window.map.mainPin.addEventListener('keydown', onPinEnterPress);

window.form.adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  var formData = new FormData(window.form.adForm);
  window.backend.uploadAdvert(onSuccesSubmit, onErrorSubmit, formData);
});

initApp();
