'use strict';

window.popups = (function () {
  var succesPopupTemplate = document.querySelector('#success');
  var errorPopupTemplate = document.querySelector('#error');

  var main = document.querySelector('main');
  var activePopup = '';


  var showSuccessPopup = function () {
    if (activePopup) {
      return;
    }
    var template = succesPopupTemplate.cloneNode(true).content;
    var successPopup = template.querySelector('.success');
    main.appendChild(successPopup);
    activePopup = main.querySelector('.success');
  };

  var showErrorPopup = function () {
    if (activePopup) {
      return;
    }
    var template = errorPopupTemplate.cloneNode(true).content;
    var errorPopup = template.querySelector('.error');
    main.appendChild(errorPopup);
    activePopup = main.querySelector('.error');
  };

  var removePopup = function () {
    activePopup.remove();
    activePopup = null;
    document.removeEventListener('keydown', window.onPopupEscPress);
    document.removeEventListener('click', window.onPopupMouseLeftPressed);
  };

  return {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup,
    removePopup: removePopup
  };


})();
