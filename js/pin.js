'use strict';

window.pin = (function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_DEFAULT_LEFT = 570;
  var PIN_DEFAULT_TOP = 375;

  var pinTemplate = document.querySelector('#pin');
  var pinsMap = document.querySelector('.map__pins');

  var createPin = function (announcementData) {
    var template = pinTemplate.cloneNode(true).content;
    var pin = template.querySelector('.map__pin');
    var avatar = template.querySelector('img');

    var pinLeft = announcementData.location.x - (PIN_WIDTH / 2);
    var pinTop = announcementData.location.y - (PIN_HEIGHT);

    pin.style.left = pinLeft + 'px';
    pin.style.top = pinTop + 'px';
    pin.alt = announcementData.offer.title;
    avatar.src = announcementData.author.avatar;
    pin.setAttribute('data-id', announcementData.id);

    return template;
  };

  var renderPins = function (announcementsData) {
    var fragment = document.createDocumentFragment();

    announcementsData.forEach(function (announcementData) {
      fragment.appendChild(createPin(announcementData));
    });

    pinsMap.appendChild(fragment);
  };

  var removePins = function () {
    var pinsAll = pinsMap.querySelectorAll('.map__pin');
    pinsAll.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var movesPinDefault = function () {
    window.map.mainPin.style.top = PIN_DEFAULT_TOP + 'px';
    window.map.mainPin.style.left = PIN_DEFAULT_LEFT + 'px';
  };

  return {
    renderPins: renderPins,
    removePins: removePins,
    movesPinDefault: movesPinDefault
  };

})();


