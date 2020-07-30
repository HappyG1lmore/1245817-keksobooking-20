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
  var resetButton = adForm.querySelector('.ad-form__reset');

  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var minPriceLimitMap = {
    'palace': 10000,
    'flat': 1000,
    'bungalo': 0,
    'house': 5000
  };

  var RoomsType = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var GuestType = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    NOT_FOR_GUEST: '0'
  };

  adForm.addEventListener('change', function (evt) {
    switch (evt.target) {
      case rooms:
      case capacity:
        validateCapacity();
        break;
      case price:
      case type:
        validateTypeOfHousing();
        break;
      case timein:
        validateTimeIn();
        break;
      case timeout:
        validateTimeOut();
        break;
    }
    adForm.reportValidity('');
  });

  var enableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    adForm.classList.remove('ad-form--disabled');
  };

  var disableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
    adForm.classList.add('ad-form--disabled');
    window.filters.resetFilters();
    window.photos.clearImages();
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
    if (rooms.value === RoomsType.ONE && capacity.value !== GuestType.ONE) {
      error = '1 комната только для 1-го гостя';
    } else if (rooms.value === RoomsType.TWO && (capacity.value === GuestType.THREE || capacity.value === GuestType.NOT_FOR_GUEST)) {
      error = '2 комнаты для 1-го или 2-ух гостей';
    } else if (rooms.value === RoomsType.THREE && capacity.value === GuestType.NOT_FOR_GUEST) {
      error = '3 комнаты для 1-го, 2-ух или 3-ех гостей';
    } else if (rooms.value === RoomsType.HUNDRED && capacity.value !== GuestType.NOT_FOR_GUEST) {
      error = 'Это помещение не для гостей';
    }
    capacity.setCustomValidity(error);
  };

  var validateTypeOfHousing = function () {
    var typeOfHousing = type.value;
    price.setAttribute('min', minPriceLimitMap[typeOfHousing]);
    price.placeholder = minPriceLimitMap[typeOfHousing];
  };

  var validateTimeIn = function () {
    timeout.value = timein.value;
  };

  var validateTimeOut = function () {
    timein.value = timeout.value;
  };

  return {
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    setAddress: setAddress,
    adForm: adForm,
    resetButton: resetButton
  };
})();
