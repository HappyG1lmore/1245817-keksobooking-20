'use strict';

window.backend = (function () {

  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';

  var Status = {
    SUCCESS: 200,
    INVALID_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    ERROR_NOT_FOUND: 404,
    SERVER_ERROR: 500,
    TIMEOUT_TIME: 10000
  };

  var createXhr = function (method, url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = Status.TIMEOUT_TIME;

    xhr.addEventListener('load', function () {
      var error = '';
      switch (xhr.status) {
        case Status.SUCCESS:
          onSuccess(xhr.response);
          break;

        case Status.INVALID_REQUEST:
          error = 'Неверный запрос';
          break;
        case Status.NOT_AUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Status.ERROR_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case Status.SERVER_ERROR:
          error = 'Во время обращения к серверу произошла ошибка. Пожалуйста, проверьте ваше интернет-соединение и обновите страницу';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    return xhr;


  };

  var loadAdverts = function (onSuccess, onError) {
    var onSuccessWrapper = function (data) {
      data.forEach(function (item, index) {
        item.id = index;
      });

      onSuccess(data);

    };
    createXhr('GET', URL_LOAD, onSuccessWrapper, onError).send();
  };

  var uploadAdvert = function (onSuccess, onError, data) {
    createXhr('POST', URL_UPLOAD, onSuccess, onError).send(data);
  };

  return {
    uploadAdvert: uploadAdvert,
    loadAdverts: loadAdverts,
  };

})();
