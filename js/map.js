'use strict';

window.map = (function () {
  var mainMap = document.querySelector('.map');
  var mainPin = mainMap.querySelector('.map__pin--main');
  var mapWidth = mainMap.clientWidth;
  // По условию дано
  var BOTTOM_MAP_BORDER = 630;
  var TOP_MAP_BORDER = 130;

  mainPin.addEventListener('mousedown', function (evt) {
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      window.form.address.value = target.x + ', ' + target.y;

      if (target.x >= 0 && target.x <= mapWidth - mainPin.clientWidth) {
        mainPin.style.left = target.x + 'px';
      }

      if (target.y >= TOP_MAP_BORDER && target.y <= BOTTOM_MAP_BORDER) {
        mainPin.style.top = target.y + 'px';
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
    mainPin: mainPin,
    mainMap: mainMap
  };
})();


