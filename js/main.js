'use strict';

var OFFERS_COUNT = 8;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 65;
var PIN_HEIGHT = 80;
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_IN_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['perfect for responsible guests on a budget who are traveling by themselves!', 'This is one of city\'s most historic and architecturally eclectic neighborhood. You’ll be close to everything but far enough to enjoy a relaxing trip. We know all the good spots like the delicious pancakes, vanilla infused orange juice and freshly brewed coffee, down the street at one of our favorite restaurants', 'Enjoy your stay in this cozy, newly remodeled studio! This studio is centrally located, a short drive from downtown and the beaches. Wifi and parking are included.', 'Brand new, very clean, studio apartment with a private bathroom, kitchenette and private work space. The studio is renovated with natural stone floors, high end finishings and closets, throughout the apartment.', 'The property is tastefully decorated with colourful patterns and traditional accents.', 'A lovely space to unwind and relax after a busy day whether it is work or play. Awake refreshed and ready for a day exploring the city via this clean, sunny apartment with impressive views. Head out and wander through the nearby farmers’ market and pick up local ingredients to later craft a meal in the fully stocked kitchen.', 'Wonderful coffee shops and restaurants close by. All kitchen items needed for cooking provided by host. Bathrooms stocked with luxury shampoos, conditioners, bath products and more.', 'Indulge in the comfort and tranquility of this contemporary property. The space features an open-concept layout, a monochromatic color scheme with stark contrasts, wood surfaces, and tasteful furnishings and decor.', 'Experience true urban living in this design-conscious property. The edited space features midcentury furnishings and colorful accents, lending it a distinctly liveable feel. Take in sweeping city views from the private balcony.', 'We know how important it is to feel comfortable & relaxed when you arrive back from a long day of sightseeing. This idea is what inspired us to build our apartment studio and provide everyone that stays a place to recharge, relax and enjoy'];
var TITLES = ['Luxury Modern ', 'Minimalist Historic ', 'Stylish Luxe ', 'A Modern & Homely ', 'Self Check-in & Parking Sovereign ', 'Executive ', 'Art-Inspired ', 'Explore the City from the Sweetest '];
var IMG_LINKS = ['https://hips.hearstapps.com/housebeautiful.cdnds.net/18/06/1518192902-shot-01-suffolk-cottage.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/51/renovation-of-the-year-2016-winner-period-home-2.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/18/06/living_01-modern-oriental.jpg', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-velvet-style-inspiration-1546446738.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/10/style-inspiration-inky-blues-5.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/10/980x653/cutting-living-room-inspiration.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/23/shot-10_green_botanical_style.jpg', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-patterns-style-inspiration-2-1522249825.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/24/hb_judymurray_2.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/10/480x516/feb2014-living-room-inspiration.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/10/640x413/daykin-living-room-inspiration.jpg', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-feature-florals-home-decor-style-inspiration-1554897383.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/10/640x492/feb2016-living-room-inspiration.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/05/01_hygge_living_room.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/36/1504880328-kelly-willmott-compact-living-room-2.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/52/cottage-kent-3.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/16/10/flynn-living-room-inspiration.jpg', 'https://hips.hearstapps.com/housebeautiful.cdnds.net/17/48/burnell-christmas-home5.jpg'];

var pinsMap = document.querySelector('.map__pins');
var mapWidth = pinsMap.clientWidth;

var pinTemplate = document.querySelector('#pin').content;

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
  pin.querySelector('button').style.left = pinData['location']['x'] - PIN_WIDTH / 2 + 'px';
  pin.querySelector('button').style.top = pinData['location']['y'] - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = pinData['author']['avatar'];
  pin.querySelector('img').alt = pinData['offer']['title'];

  return pin;
};

var renderAllPins = function (array) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }

  return fragment;
};

var similarAds = generateSimilarAds(OFFERS_COUNT);
pinsMap.appendChild(renderAllPins(similarAds));

document.querySelector('.map').classList.remove('map--faded');
