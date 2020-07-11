'use strict';

window.card = (function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var cardTemplate = document.querySelector('#card');

  var hideBlock = function (blockElement) {
    blockElement.classList.add('hidden');
  };

  var offerTypeDisplay = {
    'palace': 'дворец',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  var addListenerCloseCard = function () {
    var mapAnnouncementСard = document.querySelector('.map__card');
    var buttonCloseCard = mapAnnouncementСard.querySelector('.popup__close');

    document.addEventListener('keydown', onCardEscPress);
    buttonCloseCard.addEventListener('click', onCardMouseClick);
  };

  var closeCard = function () {
    var mapAnnouncementСard = document.querySelector('.map__card');
    var buttonCloseCard = mapAnnouncementСard.querySelector('.popup__close');

    mapAnnouncementСard.remove();
    // по логике тут нужно удалять слушатели закрывающие карточку
    document.removeEventListener('keydown', onCardEscPress);
    buttonCloseCard.addEventListener('click', onCardMouseClick);
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeCard();
    }
  };

  var onCardMouseClick = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      closeCard();
    }
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

    var addFeatures = function (featuresArr) {
      features.innerHTML = '';
      featuresArr.forEach(function (feature) {
        var li = document.createElement('li');
        li.classList.add('popup__feature', 'popup__feature--' + feature);
        features.appendChild(li);
      });
    };

    var addPhotos = function (photosArr) {
      photos.innerHTML = '';
      photosArr.forEach(function (photoSrc) {
        var img = document.createElement('img');
        img.src = photoSrc;
        img.classList.add('popup__photo');
        img.alt = 'Фотография жилья';
        img.width = PHOTO_WIDTH;
        img.height = PHOTO_HEIGHT;
        photos.appendChild(img);
      });
    };

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

  var renderCard = function (cardData) {
    var card = createCard(cardData);
    window.map.mapForm.before(card);
    addListenerCloseCard(cardData);
  };

  return {
    renderCard: renderCard,
    closeCard: closeCard,
    offerTypeDisplay: offerTypeDisplay
  };

})();
