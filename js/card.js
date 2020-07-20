'use strict';

window.card = (function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card');

  var activeCard;
  var activePin;

  var hideBlock = function (blockElement) {
    blockElement.classList.add('hidden');
  };

  var offerTypeDisplay = {
    'palace': 'дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var onCardEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      removeCard();
    }
  };

  var onCardMouseClick = function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      removeCard();
    }
  };

  var removeCard = function () {
    if (!activeCard) {
      return;
    }
    document.removeEventListener('keydown', onCardEscPress);
    activeCard.removeEventListener('click', onCardMouseClick);
    activeCard.remove();
    activePin.classList.remove('map__pin--active');
    activeCard = null;
    activePin = null;
  };

  var addCardEventListeners = function () {
    document.addEventListener('keydown', onCardEscPress);
    activeCard.addEventListener('click', onCardMouseClick);
  };

  var createCard = function (cardData) {
    var template = cardTemplate.cloneNode(true).content;
    var avatar = template.querySelector('.popup__avatar');
    var title = template.querySelector('.popup__title');
    var address = template.querySelector('.popup__text--address');
    var price = template.querySelector('.popup__text--price');
    var type = template.querySelector('.popup__type');
    var capacity = template.querySelector('.popup__text--capacity');
    var time = template.querySelector('.popup__text--time');
    var features = template.querySelector('.popup__features');
    var description = template.querySelector('.popup__description');
    var photos = template.querySelector('.popup__photos');

    var addFeatures = function () {
      features.innerHTML = '';
      cardData.offer.features.forEach(function (feature) {
        var li = document.createElement('li');
        li.classList.add('popup__feature', 'popup__feature--' + feature);
        features.appendChild(li);
      });
    };

    var addPhotos = function () {
      photos.innerHTML = '';
      cardData.offer.photos.forEach(function (photoSrc) {
        var img = document.createElement('img');
        img.src = photoSrc;
        img.classList.add('popup__photo');
        img.alt = 'Фотография жилья';
        img.width = PHOTO_WIDTH;
        img.height = PHOTO_HEIGHT;
        photos.appendChild(img);
      });
    };


    if (cardData.offer.title) {
      title.textContent = cardData.offer.title;
    } else {
      hideBlock(title);
    }

    if (cardData.offer.address) {
      address.textContent = cardData.offer.address;
    } else {
      hideBlock(address);
    }

    if (cardData.offer.price) {
      price.textContent = cardData.offer.price + '₽/ночь';
    } else {
      hideBlock(price);
    }

    if (cardData.offer.rooms && cardData.offer.guests) {
      capacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    } else {
      hideBlock(capacity);
    }

    if (cardData.offer.checkin && cardData.offer.checkout) {
      time.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    } else {
      hideBlock(time);
    }

    if (cardData.offer.description) {
      description.textContent = cardData.offer.description;
    } else {
      hideBlock(description);
    }

    if (cardData.offer.type) {
      type.textContent = offerTypeDisplay[cardData.offer.type];
    } else {
      hideBlock(type);
    }

    if (cardData.author.avatar) {
      avatar.src = cardData.author.avatar;
    } else {
      hideBlock(avatar);
    }


    if (cardData.offer.photos && cardData.offer.photos.length) {
      addPhotos(cardData.offer.photos);
    } else {
      hideBlock(photos);
    }

    if (cardData.offer.features && cardData.offer.features.length) {
      addFeatures(cardData.offer.features);
    } else {
      hideBlock(features);
    }

    return template;
  };

  var renderCard = function (cardData, pin) {
    if (activeCard) {
      removeCard();
    }

    var card = createCard(cardData);
    activeCard = card.querySelector('.map__card');
    activePin = pin;
    addCardEventListeners();
    window.map.mapForm.before(card);
  };

  return {
    renderCard: renderCard,
    offerTypeDisplay: offerTypeDisplay,
    removeCard: removeCard
  };

})();
