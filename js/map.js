'use strict';

window.map = (function () {
  var mapMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var makeAppActive = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.enableAdForm();
  };

  mapMain.addEventListener('mousedown', function (evt) {
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

      mapMain.style.top = (mapMain.offsetTop - shift.y) + 'px';
      mapMain.style.left = (mapMain.offsetLeft - shift.x) + 'px';
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
    makeAppActive: makeAppActive,
    mapMain: mapMain,
    map: map
  };
})();


