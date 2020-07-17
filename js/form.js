'use strict';

window.form = (function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var MAIN_PIN_INITIAL_X = 570;
  var MAIN_PIN_INITIAL_Y = 375;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var minPriceLimit = {
    'palace': 10000,
    'flat': 1000,
    'bungalo': 0,
    'house': 5000
  };

  adForm.addEventListener('change', function (evt) {
    if (evt.target === rooms || evt.target === capacity) {
      validateCapacity();
    } else if (evt.target === price || evt.target === type) {
      validateTypeOfHousing();
    } else if (evt.target === timein) {
      validateTimeIn();
    } else if (evt.target === timeout) {
      validateTimeOut();
    }
    adForm.reportValidity('');
  });

  var enableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
      adForm.classList.remove('ad-form--disabled');
    });
  };

  var disableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var setAddress = function (mainPinX, mainPinY) {
    var x = typeof mainPinX === 'number' ? mainPinX : MAIN_PIN_INITIAL_X;
    var y = typeof mainPinY === 'number' ? mainPinY : MAIN_PIN_INITIAL_Y;

    var offsetX = MAIN_PIN_WIDTH / 2;
    var offsetY = window.isAppActive ? MAIN_PIN_HEIGHT : MAIN_PIN_HEIGHT / 2;

    address.value = Math.round((x + offsetX)) + ', ' + Math.round((y + offsetY));
  };

  var validateCapacity = function () {
    var error = '';
    if (rooms.value === '1' && capacity.value !== '1') {
      error = '1 комната только для 1-го гостя';
    } else if (rooms.value === '2' && (capacity.value === '3' || capacity.value === '0')) {
      error = '2 комнаты для 1-го или 2-ух гостей';
    } else if (rooms.value === '3' && capacity.value === '0') {
      error = '3 комнаты для 1-го, 2-ух или 3-ех гостей';
    } else if (rooms.value === '100' && capacity.value !== '0') {
      error = 'Это помещение не для гостей';
    }
    capacity.setCustomValidity(error);
  };

  var validateTypeOfHousing = function () {
    var typeOfHousing = type.value;
    price.setAttribute('min', minPriceLimit[typeOfHousing]);
    price.placeholder = minPriceLimit[typeOfHousing];
  };

  var validateTimeIn = function () {
    timeout.value = timein.value;
  };

  var validateTimeOut = function () {
    timein.value = timeout.value;
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(adForm), function (response) {
    // тут как я понимаю должна быть логика возврата приложения в начальное состояние
    // а еще должна отрендерится окошко сообщение об успешной отправке??
    });
    evt.preventDefault();
  });

  return {
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    setAddress: setAddress
  };
})();
