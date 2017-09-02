//Файл map.js
'use strict'
var ADVERT_AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var ADVERT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ADVERT_TYPE = ['flat', 'house', 'bungalo'];

var ADVERT_CHECKIN_CHECOUT = ['12:00', '13:00', '14:00'];

var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ADVERT_COUNT = 8;

var sizePin = {};

var pinsMap = document.querySelector('.tokyo__pin-map');

var lodgeAdvertTemplate = document.querySelector('#lodge-template').content;

var offerDialog = document.querySelector('#offer-dialog');

var dialogPanel = offerDialog.querySelector('.dialog__panel');

var getRandomAdverts = function (avatars, titles, types, check, features, count) {
  var advertsArray = [];
  var avatarsArray = avatars.slice();
  var titlesArray = titles.slice();

  for (var i = 0; i < count; i++) {
    var locX = getRandomReal(300, 900);
    var locY = getRandomReal(100, 500);
    advertsArray[i] = {
      author: {
        avatar: getNoRepeatValue(avatarsArray)
      },

      offer: {
        title: getNoRepeatValue(titlesArray),
        address: locX + ', ' + locY,
        price: getRandomInt(1000, 1000000),
        type: getRandomize(types),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomize(check),
        checkout: getRandomize(check),
        features: getRandomArray(features),
        description: '',
        photos: []
      },
      location: {
        x: locX,
        y: locY
      }
    };
  }
  return advertsArray;
};

function getRandomize(array) {
  var randomArray = array[Math.floor(Math.random() * array.length)];
  return randomArray;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomReal(min, max) {
  return Math.random() * (max - min) + min;
}

var getNoRepeatValue = function (array) {
  var index = getRandomNum(array.length);
  var value = array[index];
  array.splice(index, 1);
  return value;
};

var getRandomNum = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomArray = function (array) {
  var newArray = [];
  var randomCount = getRandomNum(array.length);
  var value = null;
  while (randomCount > 0) {
    value = array[getRandomNum(array.length)];
    if (newArray.indexOf(value) !== -1) {
      continue;
    } else {
      newArray.push(value);
      randomCount--;
    }
  }
  return newArray;
};

var getSizePin = function (element) {
  var param = {};
  pinsMap.appendChild(element);
  param.halfWidth = element.clientWidth / 2;
  param.height = element.clientHeight;
  pinsMap.removeChild(element);
  return param;
};

var createPin = function (pinAds) {
  var pinElement = document.createElement('div');
  var pinImage = document.createElement('img');
  pinElement.appendChild(pinImage);
  pinElement.className = 'pin';
  pinImage.className = 'rounded';
  pinImage.width = '40';
  pinImage.height = '40';
  if (!sizePin.height) {
    sizePin = getSizePin(pinElement);
  }
  pinElement.style.left = pinAds.location.x - sizePin.halfWidth + 'px';
  pinElement.style.top = pinAds.location.y - sizePin.height + 'px';
  pinImage.src = pinAds.author.avatar;
  return pinElement;
};

var renderPin = function (arrayPin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arrayPin.length; i++) {
    fragment.appendChild(createPin(arrayPin[i]));
  }
  pinsMap.appendChild(fragment);
};

var renderAdvert = function (dialogElement) {
  var advertElement = lodgeAdvertTemplate.cloneNode(true);

  advertElement.querySelector('.lodge__title').textContent = dialogElement.offer.title;
  advertElement.querySelector('.lodge__address').textContent = dialogElement.offer.address;
  advertElement.querySelector('.lodge__price').textContent = dialogElement.offer.price + ' \u20BD/ночь';
  advertElement.querySelector('.lodge__type').textContent = dialogElement.offer.type;
  advertElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dialogElement.offer.guests + ' гостей в ' + dialogElement.offer.rooms + ' комнатах';
  advertElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dialogElement.offer.checkin + ', выезд до ' + dialogElement.offer.checkout;
  var allFeatures = advertElement.querySelector('.lodge__features');
  for (var i = 0; i < dialogElement.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + dialogElement.offer.features[i];
    allFeatures.appendChild(span);
  }
  advertElement.querySelector('.lodge__description').textContent = dialogElement.offer.description;

  return advertElement;
};

var replaceDialog = function (adsElement) {
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var dialogImage = dialogTitle.querySelector('img');
  dialogImage.src = adsElement.author.avatar;
  offerDialog.replaceChild(renderAdvert(adsElement), dialogPanel);
};

var adverts = getRandomAdverts(ADVERT_AVATAR, ADVERT_TITLE, ADVERT_TYPE, ADVERT_CHECKIN_CHECOUT, ADVERT_FEATURES, ADVERT_COUNT);

renderPin(adverts);
replaceDialog(adverts[0]);
