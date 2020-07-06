'use strict';

window.constants = (function () {

  var TITLES = ['Заголовок предложения 1', 'Заголовок предложения 2', 'Заголовок предложения 3'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Прекрасные апартаменты!', 'Такое себе', 'Очень приочень'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 3;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 6;
  var AMOUNT_ADS = 8;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var DEFAULT_PIN_WIDTH = 65;
  var DEFAULT_PIN_HEIGHT = 65;

  var DEFAULT_PIN_LEFT = 570;
  var DEFAULT_PIN_TOP = 375;

  return {
    TITLES: TITLES,
    TYPES: TYPES,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    AMOUNT_ADS: AMOUNT_ADS,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    DEFAULT_PIN_WIDTH: DEFAULT_PIN_WIDTH,
    DEFAULT_PIN_HEIGHT: DEFAULT_PIN_HEIGHT,

    DEFAULT_PIN_LEFT: DEFAULT_PIN_LEFT,
    DEFAULT_PIN_TOP: DEFAULT_PIN_TOP
  };

})();


