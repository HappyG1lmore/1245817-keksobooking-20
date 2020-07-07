'use strict';

// вызвал функцию добавления атрибута disabled (КАК БЫТЬ С ФУНКЦИЯМИ КОТОРЫЕ ДОЛЖНЫ САМИ СРАБАТЫВАТЬ?)
window.form.disableAdForm();

// заполнил поле адреса
window.form.setInitialAddress();

var enableApp = function () {
  window.form.enableAdForm();
  window.map.enableMap();
};

window.map.mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    enableApp();
    window.map.enableMap();
    window.form.setActiveAddress();
    window.pin.renderPins(window.data.announcements);
  }
});

window.map.mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    enableApp();
    window.map.enableMap();
    window.form.setActiveAddress();
    window.pin.renderPins(window.data.announcements);
  }
});
