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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var DEFAULT_PIN_WIDTH = 65;
var DEFAULT_PIN_HEIGHT = 65;

var DEFAULT_PIN_LEFT = 570;
var DEFAULT_PIN_TOP = 375;

var mapMainEl = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var formBasic = document.querySelector('.ad-form');
var fieldsets = formBasic.querySelectorAll('fieldset');

var address = document.querySelector('#address');

var rooms = formBasic.querySelector('#room_number');
var capacity = formBasic.querySelector('#capacity');

// ТЕСТИРУЮ ТУТ, ПРОВЕРЯЮ ГИПОТЕЗЫ, ПОТОМ УДАЛЮ)------------------------
var addd = document.querySelector('.ad-form__element');
document.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    console.log();
  }
});
// -----------------------------------------------------------------------

// функции, активирует и деактивирует форму
var enableForm = function () {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = false;
  });
};

var disabledForm = function () {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = true;
  });
};

// Футкция, адрес первого дефолтного пина (элипс)
var setEnAdress = function () {
  address.value = (DEFAULT_PIN_LEFT - (DEFAULT_PIN_WIDTH / 2)) + ', ' + (DEFAULT_PIN_TOP - (DEFAULT_PIN_HEIGHT / 2));
};

// Функция, поле адреса при активации формы
var setActiveAdress = function () {
  address.value = (DEFAULT_PIN_LEFT - (DEFAULT_PIN_WIDTH / 2)) + ', ' + (DEFAULT_PIN_TOP - DEFAULT_PIN_HEIGHT);
};

// функция, делает страницу активной
var makeAppActive = function () {
  map.classList.remove('map--faded');
  formBasic.classList.remove('ad-form--disabled');
  enableForm();
};

// функция заполнения поля адреса
var getAddressValue = function (array) {
  address.value = (array.location.x - (DEFAULT_PIN_WIDTH / 2)) + ', ' + array.location.y - (DEFAULT_PIN_HEIGHT);
};

// функция валидации комнат и количества гостей
var checkValidityRooms = function (numberOfRooms, numberOfGuests) {
  if (numberOfRooms.value === '1' && numberOfGuests.value !== '1') {
    capacity.setCustomValidity('1 комната только для 1-го гостя');
  } else if (numberOfRooms.value === '2' && (numberOfGuests.value === '3' || numberOfGuests.value === '0')) {
    capacity.setCustomValidity('2 комнаты для 1-го или 2-ух гостей');
  } else if (numberOfRooms.value === '3' && numberOfGuests.value === '0') {
    capacity.setCustomValidity('3 комнаты для 1-го, 2-ух или 3-ех гостей');
  } else if (numberOfRooms.value === '100' && numberOfGuests.value !== '0') {
    capacity.setCustomValidity('Это помещение не для гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

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

// вызвал функцию добавления атрибута disabled
disabledForm();

// заполнил поле адреса
setEnAdress();

// Слушаю форму
formBasic.addEventListener('change', function (evt) {
  if (evt.target === rooms || evt.target === capacity) {
    checkValidityRooms(rooms, capacity);
  }
  formBasic.reportValidity('');
});

// Адрес (координаты) пока вписал в поле из случайного массив, потом изменю
mapMainEl.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makeAppActive();
    setActiveAdress();
  }
});

mapMainEl.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    makeAppActive();
    getAddressValue(announcements);
  }
});

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

var announcements = createAnnouncements();


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

renderPins(announcements);
