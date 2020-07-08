'use strict';
var appActive = false;

// вызвал функцию добавления атрибута disabled (КАК БЫТЬ С ФУНКЦИЯМИ КОТОРЫЕ ДОЛЖНЫ САМИ СРАБАТЫВАТЬ?)
window.form.disableAdForm();

// заполнил поле адреса
window.form.setInitialAddress();

var enableApp = function () {
  window.form.enableAdForm();
  window.map.mainMap.classList.remove('map--faded');
};

window.map.mainPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    if (appActive === true) {
      return;
    }
    appActive = true;
    enableApp();
    window.form.setActiveAddress();
    window.pin.renderPins(window.data.announcements);
  }
});

window.map.mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    if (appActive === true) {
      return;
    }
    appActive = true;
    enableApp();
    window.form.setActiveAddress();
    window.pin.renderPins(window.data.announcements);
  }
});
