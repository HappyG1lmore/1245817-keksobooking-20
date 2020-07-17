'use strict';

window.data = (function () {

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

  var createAnnouncements = function () {
    var result = [];

    for (var i = 0; i < AMOUNT_ADS; i++) {
      result.push({
        id: i,
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.utils.getRandomArrayItem(TITLES),
          address: String(window.utils.getRandomIntFromRange(MIN_X, MAX_X) + ', ' + window.utils.getRandomIntFromRange(MIN_Y, MAX_Y)),
          price: window.utils. getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
          type: window.utils.getRandomArrayItem(TYPES),
          rooms: window.utils.getRandomIntFromRange(MIN_ROOMS, MAX_ROOMS),
          guests: window.utils.getRandomIntFromRange(MIN_GUESTS, MAX_GUESTS),
          checkin: window.utils.getRandomArrayItem(CHECKINS),
          checkout: window.utils.getRandomArrayItem(CHECKOUTS),
          features: window.utils.getRandomLengthArray(FEATURES),
          description: window.utils.getRandomArrayItem(DESCRIPTIONS),
          photos: window.utils.getRandomLengthArray(PHOTOS),
        },
        location: {
          x: window.utils.getRandomIntFromRange(MIN_X, MAX_X),
          y: window.utils.getRandomIntFromRange(MIN_Y, MAX_Y),
        },
      });
    }
    return result;
  };

  var announcements = createAnnouncements();

  return {
    announcements: announcements,
  };
})();
