'use strict';
var isAppActive = false;

var initApp = function () {
  window.form.disableAdForm();
  window.form.setInitialAddress();
};

initApp();

var onMapClick = function (evt) {
  var closestPin = evt.target.closest('.map__pin');
  var mapAnnouncementСard = document.querySelector('.map__card');

  if (closestPin && !closestPin.classList.contains('map__pin--main')) {

    if (mapAnnouncementСard) {
      mapAnnouncementСard.remove();
    }
    window.card.renderCard(window.data.announcements[closestPin.dataset.id]);
  }
};

var enableApp = function () {
  window.form.enableAdForm();
  window.map.mainMap.classList.remove('map--faded');
  window.form.setActiveAddress();
  window.pin.renderPins(window.data.announcements);
  window.map.mainMap.addEventListener('click', onMapClick);

  /*pinCollection = document.querySelectorAll('.map__pin');

  for (var i = 0; i < pinCollection.length; i++) {
    var pin = pinCollection[i];
    if (pin.classList.value !== ('map__pin' + ' map__pin--main')) {
      window.pin.addClickListener(pin);
    }
  }*/
};

window.map.mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    if (isAppActive) {
      return;
    }
    isAppActive = true;
    enableApp();
  }
});

window.map.mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    if (isAppActive) {
      return;
    }
    isAppActive = true;
    enableApp();
  }
});

