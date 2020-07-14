'use strict';

window.map = (function () {
  var BOTTOM_MAP_BORDER = 630;
  var TOP_MAP_BORDER = 130;

  var mainMap = document.querySelector('.map');
  var mainPin = mainMap.querySelector('.map__pin--main');
  var mapForm = mainMap.querySelector('.map__filters-container');
  var mapWidth = mainMap.clientWidth;

  var moveStartCoords;

  var onMouseMove = function (evt) {
    evt.preventDefault();

    var shift = {
      x: moveStartCoords.x - evt.clientX,
      y: moveStartCoords.y - evt.clientY
    };

    var target = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    if (target.x >= 0 && target.x <= mapWidth - mainPin.clientWidth) {
      mainPin.style.left = target.x + 'px';
    }

    if (target.y >= TOP_MAP_BORDER && target.y <= BOTTOM_MAP_BORDER) {
      mainPin.style.top = target.y + 'px';
    }

    moveStartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    window.form.setAddress(target.x, target.y);
  };

  var onMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    moveStartCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onMouseDown);

  return {
    mainPin: mainPin,
    mainMap: mainMap,
    mapForm: mapForm,
  };
})();

