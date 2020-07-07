'use strict';

window.map = (function () {
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var mapWidth = map.clientWidth;
  // По условию дано
  var lowerBorderMap = 630;
  var UpperBorderMap = 130;

  var enableMap = function () {
    map.classList.remove('map--faded');
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var target = {
        x: mapPin.offsetLeft - shift.x,
        y: mapPin.offsetTop - shift.y
      };

      window.form.address.value = target.x + ', ' + target.y;

      if (target.x >= 0 && target.x <= mapWidth - mapPin.clientWidth) {
        mapPin.style.left = target.x + 'px';
      }

      if (target.y >= UpperBorderMap && target.y <= lowerBorderMap) {
        mapPin.style.top = target.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  return {
    enableMap: enableMap,
    mapPin: mapPin,
    map: map
  };
})();


