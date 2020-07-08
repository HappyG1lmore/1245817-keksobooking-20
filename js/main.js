'use strict';
var isAppActive = false;

var initApp = function () {
  window.form.disableAdForm();
  window.form.setInitialAddress();
};

initApp();

var enableApp = function () {
  window.form.enableAdForm();
  window.map.mainMap.classList.remove('map--faded');
  window.form.setActiveAddress();
  window.pin.renderPins(window.data.announcements);
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
