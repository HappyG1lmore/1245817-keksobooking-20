'use strict';

window.data = (function () {

  var createAnnouncements = function () {
    var result = [];

    for (var i = 0; i < window.constants.AMOUNT_ADS; i++) {
      result.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.utils.getRandomArrayItem(window.constants.TITLES),
          address: String(window.utils.getRandomIntFromRange(window.constants.MIN_X, window.constants.MAX_X) + ', ' + window.utils.getRandomIntFromRange(window.constants.MIN_Y, window.constants.MAX_Y)),
          price: window.utils. getRandomIntFromRange(window.constants.MIN_PRICE, window.constants.MAX_PRICE),
          type: window.utils.getRandomArrayItem(window.constants.TYPES),
          rooms: window.utils.getRandomIntFromRange(window.constants.MIN_ROOMS, window.constants.MAX_ROOMS),
          guests: window.utils.getRandomIntFromRange(window.constants.MIN_GUESTS, window.constants.MAX_GUESTS),
          checkin: window.utils.getRandomArrayItem(window.constants.CHECKINS),
          checkout: window.utils.getRandomArrayItem(window.constants.CHECKOUTS),
          features: window.utils.getRandomLengthArray(window.constants.FEATURES),
          description: window.utils.getRandomArrayItem(window.constants.DESCRIPTIONS),
          photos: window.utils.getRandomLengthArray(window.constants.PHOTOS),
        },
        location: {
          x: window.utils.getRandomIntFromRange(window.constants.MIN_X, window.constants.MAX_X),
          y: window.utils.getRandomIntFromRange(window.constants.MIN_Y, window.constants.MAX_Y),
        },
      });
    }
    return result;
  };

  var announcements = createAnnouncements();

  return {
    announcements: announcements
  };
})();
