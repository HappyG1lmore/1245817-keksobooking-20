'use strict';

window.utils = (function () {
  var getRandomIntFromRange = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomArrayItem = function (array) {
    return array[getRandomIntFromRange(0, array.length - 1)];
  };

  // массив случайной длинны
  var getRandomLengthArray = function (array) {
    var tempArray = [];
    for (var i = 0; i < getRandomIntFromRange(1, array.length); i++) {
      tempArray.push(array[getRandomIntFromRange(0, array.length - 1)]);
    }
    return tempArray;
  };

  return {
    getRandomIntFromRange: getRandomIntFromRange,
    getRandomArrayItem: getRandomArrayItem,
    getRandomLengthArray: getRandomLengthArray
  };
})();


/*
window.random = (function () {

  return {
    getRandomIntFromRange: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    getRandomArrayItem: function (array) {
      return array[window.random.getRandomIntFromRange(0, array.length - 1)];
    },

    // массив случайной длинны
    getRandomLengthArray: function (array) {
      var tempArray = [];
      for (var i = 0; i < window.random.getRandomIntFromRange(1, array.length); i++) {
        tempArray.push(array[window.random.getRandomIntFromRange(0, array.length - 1)]);
      }
      return tempArray;
    }
  };
})();
*/


