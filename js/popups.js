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
    activePopup = successPopup;
    document.addEventListener('click', onPopupMouseLeftPressed);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var showErrorPopup = function () {
    if (activePopup) {
      return;
    }
    var template = errorPopupTemplate.cloneNode(true).content;
    var errorPopup = template.querySelector('.error');
    main.appendChild(errorPopup);
    activePopup = errorPopup;
    document.addEventListener('click', onPopupMouseLeftPressed);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupMouseLeftPressed = function (evt) {
    if (window.utils.isMouseLeftPressed(evt)) {
      if (event.target.tagName !== 'P' || event.target.classList.contains('error__button')) {
        removePopup();
      }
    }
  };

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      removePopup();
    }
  };

  var removePopup = function () {
    activePopup.remove();
    activePopup = null;
    document.removeEventListener('keydown', onPopupEscPress);
    document.removeEventListener('click', onPopupMouseLeftPressed);
  };

  return {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup,
  };

})();
