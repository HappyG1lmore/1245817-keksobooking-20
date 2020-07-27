'use strict';

window.popups = (function () {
  var MODAL_CONTENT_TAG = 'P';

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
    document.addEventListener('click', onPopupClick);
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
    document.addEventListener('click', onPopupClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onPopupClick = function (evt) {
    if (evt.target.tagName !== MODAL_CONTENT_TAG || evt.target.classList.contains('error__button')) {
      removePopup();
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
    document.removeEventListener('click', onPopupClick);
  };

  return {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup,
  };

})();
