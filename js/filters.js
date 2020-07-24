'use strict';

window.filters = (function () {
  var MAX_AMOUNT_PINS = 5;
  var ZERO = 0;
  var DEBOUNCE_INTERVAL_FILTER = 500;
  var LOWER_PRICE = 10000;
  var UPPER_PRICE = 50000;

  var filterForm = document.querySelector('.map__filters');
  var filtersSelect = filterForm.querySelectorAll('select');
  var priceFilter = filterForm.querySelector('#housing-price');
  var roomsFilter = filterForm.querySelector('#housing-rooms');
  var guestsFilter = filterForm.querySelector('#housing-guests');
  var typeFilter = filterForm.querySelector('#housing-type');
  var featuresFilter = filterForm.querySelector('#housing-features');
  var housingFeatures = filterForm.querySelectorAll('.map__checkbox');

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
      return filterByOffer(advert) && filterByType(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert);
    });
    if (filteredData.length > MAX_AMOUNT_PINS) {
      filteredData = filteredData.slice(ZERO, (MAX_AMOUNT_PINS));
    }
    window.pin.renderPins(filteredData);
  };

  var resetFilters = function () {
    filterForm.reset();
  };

  var onChangeFilter = window.utils.debounce(applyFilters, DEBOUNCE_INTERVAL_FILTER);

  var filterByFeatures = function (advert) {
    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked) {
        var element = housingFeatures[i].value;
        if (advert.offer.features.indexOf(element) === -1) {
          return false;
        }
      }
    }
    return true;
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
        return advert.offer.price <= LOWER_PRICE;
      case 'middle':
        return advert.offer.price >= LOWER_PRICE && advert.offer.price <= UPPER_PRICE;
      case 'high':
        return advert.offer.price >= UPPER_PRICE;
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

  var filterByOffer = function (advert) {
    return Boolean(advert.offer);
  };

  return {
    filterForm: filterForm,
    enableFilter: enableFilter,
    disableFilter: disableFilter,
    applyFilters: applyFilters,
    resetFilters: resetFilters
  };
})();
