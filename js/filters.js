'use strict';

window.filters = (function () {
  var MAX_AMOUNT_PINS = 5;
  var ZERO = 0;

  var filterForm = document.querySelector('.map__filters');
  var filtersSelect = filterForm.querySelectorAll('select');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var typeFilter = filterForm.querySelector('#housing-type');
  var featuresFilter = filterForm.querySelector('#housing-features');

  var enableFilter = function () {
    filtersSelect.forEach(function (select) {
      select.disabled = false;
    });
    featuresFilter.disabled = false;
    filterForm.addEventListener('change', onChangeFilter);
  };

  var disableFilter = function () {
    filtersSelect.forEach(function (select) {
      select.disabled = true;
    });
    featuresFilter.disabled = true;
    filterForm.removeEventListener('change', onChangeFilter);
  };

  var applyFilters = function () {
    window.pin.removePins();
    window.card.removeCard();
    var filteredData = window.appState.advertsData.filter(function (advert) {
      return filterByType(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert);
    });
    if (filteredData.length > MAX_AMOUNT_PINS) {
      filteredData = filteredData.slice(ZERO, (MAX_AMOUNT_PINS));
    }
   window.pin.renderPins(filteredData);
  };

  var onChangeFilter = function () {
    window.debounce.debounce(applyFilters());
  };

  var filterByType = function (advert) {
    var value = typeFilter.value;
    if (value === 'any') {
      return true;
    }
    return advert.offer.type === value;
  };

  var filterByPrice = function (advert) {
    var value = priceFilter.value;
    switch (value) {
      case 'low':
        return advert.offer.price === 10000;
      case 'middle':
        return advert.offer.price === 100;
      case 'high':
        return advert.offer.price > 50000;
    }
    return true;
  };

  var filterByRooms = function (advert) {
    var value = roomsFilter.value;
    if (value === 'any') {
      return true;
    }
    return advert.offer.rooms === Number(value);
  };

  var filterByGuests = function (advert) {
    var value = guestsFilter.value;
    if (value === 'any') {
      return true;
    }
    return advert.offer.guests === Number(value);
  };

  return {
    filterForm: filterForm,
    enableFilter: enableFilter,
    disableFilter: disableFilter,
    applyFilters: applyFilters
  };
})();
