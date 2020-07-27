'use strict';

(function () {
  var initApp = function () {
    window.form.disableAdForm();
    window.form.setAddress();
    window.filters.disableFilter();
  };

  var enableApp = function () {
    if (window.appState.isAppActive) {
      return;
    }
    window.appState.isAppActive = true;
    window.form.enableAdForm();
    window.form.resetButton.addEventListener('click', onResetClick);
    window.map.mainMap.classList.remove('map--faded');
    window.form.setAddress();
    window.backend.loadAdverts(
        function (data) {
          window.appState.advertsData = data;
          window.filters.enableFilter();
          window.filters.applyFilters();
        }
    );
    window.map.mainMap.addEventListener('click', onMapClick);
  };

  var disableApp = function () {
    window.form.adForm.reset();
    window.pin.removePins();
    window.pin.resetMainPinPosition();
    window.card.removeCard();
    window.appState.isAppActive = false;
    window.form.disableAdForm();
    window.filters.disableFilter();
    window.form.resetButton.removeEventListener('click', onResetClick);
    window.map.mainMap.classList.add('map--faded');
    window.form.setAddress();
    window.map.mainMap.removeEventListener('click', onMapClick);
  };

  var onResetClick = function () {
    disableApp();
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
    window.popups.showSuccessPopup();
  };

  var onErrorSubmit = function () {
    window.popups.showErrorPopup();
  };

  window.map.mainPin.addEventListener('mousedown', onPinMouseClick);
  window.map.mainPin.addEventListener('keydown', onPinEnterPress);

  window.form.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(window.form.adForm);
    window.backend.uploadAdvert(onSuccesSubmit, onErrorSubmit, formData);
  });

  initApp();
})();
