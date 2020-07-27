'use strict';

window.photos = (function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var avatarUpload = document.querySelector('#avatar');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingImagesUpload = document.querySelector('#images');
  var housingImages = document.querySelector('.ad-form__photo');

  var TypePhotoOptions = {
    WIDTH: 70,
    HEIGHT: 70,
    BORDER_RADIUS: 5
  };

  var clearImages = function () {
    avatar.src = DEFAULT_AVATAR_SRC;
    housingImages.innerHTML = '';
  };

  var addImage = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {

        switch (evt.target) {
          case avatarUpload:
            avatar.src = reader.result;
            break;
          case housingImagesUpload:
            housingImages.innerHTML = '';
            var img = document.createElement('img');
            img.width = TypePhotoOptions.WIDTH;
            img.height = TypePhotoOptions.HEIGHT;
            img.style.borderRadius = TypePhotoOptions.BORDER_RADIUS + 'px';
            img.src = reader.result;
            housingImages.appendChild(img);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarUpload.addEventListener('change', addImage);
  housingImagesUpload.addEventListener('change', addImage);

  return {
    clearImages: clearImages
  };
})();
