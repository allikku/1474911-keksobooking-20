'use strict';

var OFFERS_COUNT = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 80;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['perfect for responsible guests on a budget who are traveling by themselves!', 'This is one of city\'s most historic and architecturally eclectic neighborhood.', 'Enjoy your stay in this cozy, newly remodeled property! It is centrally located, a short drive from downtown.', 'Brand new, very clean with a private bathroom, kitchenette and private work space.', 'The property is tastefully decorated with colourful patterns and traditional accents.', 'A lovely space to unwind and relax after a busy day whether it is work or play.', 'Wonderful coffee shops and restaurants close by. All kitchen items needed for cooking provided by host.', 'Indulge in the comfort and tranquility of this contemporary property. The space features an open-concept layout'];
var TITLES = ['Luxury Modern ', 'Minimalist Historic ', 'Stylish Luxe ', 'A Modern & Homely ', 'Self Check-in & Parking Sovereign ', 'Executive ', 'Art-Inspired ', 'Explore the City from the Sweetest '];
var IMG_LINKS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
var pinsMap = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content;
var cardTemplate = document.querySelector('#card').content;
var mapWidth = pinsMap.clientWidth;


var TypesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomArrayElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var getAvatar = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

// shuffles the array and return N elements
var getRandomElements = function (array, N) {
  var shuffledArray = array.slice();
  var m = shuffledArray.length;
  var t;
  var i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = shuffledArray[m];
    shuffledArray[m] = shuffledArray[i];
    shuffledArray[i] = t;
  }
  return shuffledArray.slice(0, N);
};

var generateSimilarAds = function (count) {
  var ads = [];

  for (var i = 0; i < count; i++) {
    var offerType = getRandomArrayElement(OFFER_TYPES);
    var locationX = getRandomNumber(0, mapWidth);
    var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX);

    ads.push({
      'author': {
        'avatar': getAvatar(i + 1)
      },
      'offer': {
        'title': getRandomArrayElement(TITLES) + offerType,
        'address': locationX + ', ' + locationY,
        'price': getRandomNumber(1, 10000),
        'type': getRandomArrayElement(OFFER_TYPES),
        'rooms': getRandomNumber(1, 10),
        'guests': getRandomNumber(1, 20),
        'checkin': getRandomArrayElement(CHECK_IN_TIMES),
        'checkout': getRandomArrayElement(CHECK_IN_TIMES),
        'features': getRandomElements(FEATURES, getRandomNumber(1, FEATURES.length)),
        'description': getRandomArrayElement(DESCRIPTIONS),
        'photos': getRandomElements(IMG_LINKS, getRandomNumber(1, IMG_LINKS.length))
      },
      'location': {
        'x': locationX,
        'y': locationY
      }
    });
  }
  return ads;
};

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);
  pin.querySelector('button').style.left = pinData.location.x - PIN_WIDTH / 2 + 'px';
  pin.querySelector('button').style.top = pinData.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;

  return pin;
};

var renderAllPins = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  return fragment;
};

var generateClassesArray = function (array, classPrefix) {
  var classesArray = array.slice();
  for (var i = 0; i < array.length; i++) {
    classesArray[i] = classPrefix + array[i];
  }
  return classesArray;
};

var getCardFeatures = function (offersClasses, template) {
  var featuresList = template.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i].classList.add('hidden');

    offersClasses.forEach(function (entry) {
      if (featuresList[i].classList.contains(entry)) {
        featuresList[i].classList.remove('hidden');
      }
    });
  }
};

var createOfferCard = function (item) {
  var card = cardTemplate.cloneNode(true);
  var cardPhotos = card.querySelector('.popup__photos');
  var photoImg = cardPhotos.querySelector('.popup__photo');
  var featuresClasses = generateClassesArray(item.offer.features, 'popup__feature--');
  card.querySelector('.popup__title').textContent = item.offer.title;
  card.querySelector('.popup__text--address').textContent = item.offer.address;
  card.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = TypesMap[item.offer.type];
  card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
  card.querySelector('.popup__description').textContent = item.offer.description;
  card.querySelector('.popup__photos').src = 'none';
  card.querySelector('.popup__avatar').src = item.author.avatar;

  getCardFeatures(featuresClasses, card);

  cardPhotos.innerHTML = '';

  for (var i = 0; i < item.offer.photos.length; i++) {
    var image = photoImg.cloneNode(true);
    image.src = item.offer.photos[i];
    cardPhotos.appendChild(image);
  }

  return card;
};

var renderCard = function (item) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createOfferCard(item));

  return fragment;
};


var similarAds = generateSimilarAds(OFFERS_COUNT);
pinsMap.appendChild(renderAllPins(similarAds));
map.insertBefore(renderCard(similarAds[0]), filtersContainer);

document.querySelector('.map').classList.remove('map--faded');
