'use strict';

// вызвал функцию добавления атрибута disabled (КАК БЫТЬ С ФУНКЦИЯМИ КОТОРЫЕ ДОЛЖНЫ САМИ СРАБАТЫВАТЬ?)
window.form.disableAdForm();

// заполнил поле адреса
window.form.setInitialAddress();

window.map.mapMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    window.map.makeAppActive();
    window.form.setActiveAdress();
    window.pin.renderPins(window.data.announcements);
  }
});

window.map.mapMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.map.makeAppActive();
    window.form.setActiveAdress();
    window.pin.renderPins(window.data.announcements);
  }
});
