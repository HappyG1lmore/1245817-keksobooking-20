'use strict';

window.utils = (function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MOUSE_LBUTTON_KEYCODE = 0;

  var debounce = function (cb, interval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  var getRandomIntFromRange = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArrayItem = function (array) {
    return array[getRandomIntFromRange(0, array.length - 1)];
  };

  var getRandomLengthArray = function (array) {
    var tempArray = [];
    for (var i = 0; i < getRandomIntFromRange(1, array.length); i++) {
      tempArray.push(array[getRandomIntFromRange(0, array.length - 1)]);
    }
    return tempArray;
  };

  var isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };

  var isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };

  var isMouseLeftPressed = function (evt) {
    return evt.button === MOUSE_LBUTTON_KEYCODE;
  };

  return {
    getRandomIntFromRange: getRandomIntFromRange,
    getRandomArrayItem: getRandomArrayItem,
    getRandomLengthArray: getRandomLengthArray,
    isEnterPressed: isEnterPressed,
    isEscPressed: isEscPressed,
    isMouseLeftPressed: isMouseLeftPressed,
    debounce: debounce,
  };
})();
