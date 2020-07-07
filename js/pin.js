'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin');
  var pinsMap = document.querySelector('.map__pins');

  var createPin = function (pinData) {
    var template = pinTemplate.cloneNode(true).content;
    var pin = template.querySelector('.map__pin');
    var avatar = template.querySelector('img');

    var pinLeft = pinData.location.x - (window.data.PIN_WIDTH / 2);
    var pinTop = pinData.location.y - (window.data.PIN_HEIGHT);

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

  return {
    renderPins: renderPins
  };

})();


