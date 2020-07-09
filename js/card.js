'use strict';

window.card = (function () {

  var cardTemplate = document.querySelector('#card');

  var createCard = function (cardData) {
    var PHOTO_WIDTH = 45;
    var PHOTO_HEIGHT = 40;

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

    title.textContent = cardData.offer.title;
    address.textContent = cardData.offer.address;
    price.textContent = cardData.offer.price + '₽/ночь';

    capacity.textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    avatar.src = cardData.author.avatar;

    description.textContent = cardData.offer.description;

    if (cardData.offer.type === 'flat') {
      type.textContent = 'Квартира';
    } else if (
      cardData.offer.type === 'house') {
      type.textContent = 'Дом';
    } else if (
      cardData.offer.type === 'bungalo') {
      type.textContent = 'Бунгало';
    } else if (
      cardData.offer.type === 'palace') {
      type.textContent = 'Дворец';
    }

    var addFeatures = function (featuresArr) {
      features.innerHTML = '';
      featuresArr.forEach(function (item) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature', 'popup__feature--' + item);
        features.appendChild(feature);
      });
    };

    var addPhotos = function (photosArr) {
      photos.innerHTML = '';
      photosArr.forEach(function (item) {
        var img = document.createElement('img');
        img.src = item;
        img.classList.add('popup__photo');
        img.alt = 'Фотография жилья';
        img.width = PHOTO_WIDTH;
        img.height = PHOTO_HEIGHT;
        photos.appendChild(img);
      });
    };

    addPhotos(cardData.offer.photos);
    addFeatures(cardData.offer.features);

    return template;
  };

  var renderCard = function (cardsData) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(cardsData));
    window.map.mapForm.before(fragment);
  };


  /*
    if  (!block.value) {
      // прячем блок
    }
    */


  return {
    renderCard: renderCard
  };

})();
