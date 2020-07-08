'use strict';

window.form = (function () {
  var DEFAULT_PIN_WIDTH = 65;
  var DEFAULT_PIN_HEIGHT = 80;
  var DEFAULT_PIN_LEFT = 570;
  var DEFAULT_PIN_TOP = 375;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  adForm.addEventListener('change', function (evt) {
    if (evt.target === rooms || evt.target === capacity) {
      validateCapacity();
    }
    adForm.reportValidity('');
  });

  var enableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = false;
      adForm.classList.remove('ad-form--disabled');
    });
  };

  // вызвал функцию добавления атрибута disabled
  var disableAdForm = function () {
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  // Футкция, адрес первого дефолтного пина (элипс)
  var setInitialAddress = function () {
    address.value = (DEFAULT_PIN_LEFT - (DEFAULT_PIN_WIDTH / 2)) + ', ' + (DEFAULT_PIN_TOP - (DEFAULT_PIN_HEIGHT / 2));
  };

  // Функция, поле адреса при активации формы
  var setActiveAddress = function () {
    address.value = (DEFAULT_PIN_LEFT - (DEFAULT_PIN_WIDTH / 2)) + ', ' + (DEFAULT_PIN_TOP - DEFAULT_PIN_HEIGHT);
  };

  // Функция валидации
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

  return {
    enableAdForm: enableAdForm,
    disableAdForm: disableAdForm,
    setInitialAddress: setInitialAddress,
    setActiveAddress: setActiveAddress,
    validateCapacity: validateCapacity,
    adForm: adForm,
    adFormFieldsets: adFormFieldsets,
    address: address,
    rooms: rooms,
    capacity: capacity
  };
})();


