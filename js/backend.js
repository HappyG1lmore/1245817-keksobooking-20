'use strict';

window.backend = (function () {

  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };


  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
    if (xhr.status === StatusCode.OK.) {
      onSuccess(xhr.response);
    } else {
      onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
    }

    });

    xhr.send();

  };

  return {
    upload: upload,
    load: load
  };



})();
