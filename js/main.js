'use strict';

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

var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

// случайная цифра
var getRandomIntFromRange = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// случайный элемент массива
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

// массив похожих объявлений
var createAnnouncements = function () {
  var result = [];

  for (var i = 0; i < AMOUNT_ADS; i++) {
    result.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomArrayItem(TITLES),
        address: String(getRandomIntFromRange(MIN_X, MAX_X) + ', ' + getRandomIntFromRange(MIN_Y, MAX_Y)),
        price: getRandomIntFromRange(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayItem(TYPES),
        rooms: getRandomIntFromRange(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomIntFromRange(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomArrayItem(CHECKINS),
        checkout: getRandomArrayItem(CHECKOUTS),
        features: getRandomLengthArray(FEATURES),
        description: getRandomArrayItem(DESCRIPTIONS),
        photos: getRandomLengthArray(PHOTOS),
      },
      location: {
        x: getRandomIntFromRange(MIN_X, MAX_X),
        y: getRandomIntFromRange(MIN_Y, MAX_Y),
      },
    });
  }
  return result;
};

// удаляем класс map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создание пина + рендер
var pinTemplate = document.querySelector('#pin');
var pinsMap = document.querySelector('.map__pins');

var createPin = function (pinData) {
  var template = pinTemplate.cloneNode(true).content;
  var pin = template.querySelector('.map__pin');
  var avatar = template.querySelector('img');

  var pinLeft = pinData.location.x - (PIN_WIDTH / 2);
  var pinTop = pinData.location.y - (PIN_HEIGHT);

  pin.style.left = pinLeft + 'px';
  pin.style.top = pinTop + 'px';
  pin.alt = pinData.offer.title;
  avatar.src = pinData.author.avatar;

  return template;
};

var renderPins = function (pinsData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(createPin(pinsData[i]));
  }

  pinsMap.appendChild(fragment);
};

var announcements = createAnnouncements();
renderPins(announcements);
