//Файл map.js
'use strict'
var ADVERT_AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var ADVERT_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var ADVERT_TYPE = ['flat', 'house', 'bungalo'];

var ADVERT_CHECKIN_CHECOUT = ['12:00', '13:00', '14:00'];

//var ADVERT_CHECKOUT = ['12:00', '13:00', '14:00'];

var ADVERT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ADVERT_COUNT = 8;

var sizePin = {};

var userDialog = document.querySelector('.tokyo');

var pinListElement = userDialog.querySelector('.tokyo__pin-map');

var lodgeAdvertTemplate = document.querySelector('#lodge-template').content;

var dialogPanel = userDialog.querySelector('.dialog__panel');

var getRandomObject = function (avatar, title, type, checkin, checout, features, count) {

  var advertsArray = [];

  for (var i = 0; i < count; i++) {
    advertsArray[i] = {
      author: {
        avatar: getRandomize(ADVERT_AVATAR)
        // avatar: 'img/avatars/user0' + getRandomize(ADVERT_AVATAR) + '.png'
      },

      offer: {
        title: getRandomize(ADVERT_TITLE),
        address: 'location.' + 'x' + ', ' + 'location.' + 'y',
        price: getRandomInt(1000, 1000000),
        type: getRandomize(ADVERT_TYPE),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomize(ADVERT_CHECKIN_CHECOUT),
        checkout: getRandomize(ADVERT_CHECKIN_CHECOUT),
        features: getRandomize(ADVERT_FEATURES),
        description: 'null',
        photos: []
      },
      location: {
        x: getRandomReal(300, 900),
        y: getRandomReal(100, 500)
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

var getSizePin = function (element) {
  var param = {};
  pinListElement.appendChild(element);
  param.halfWidth = element.clientWidth / 2;
  param.height = element.clientHeight;
  pinListElement.removeChild(element);
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


var renderAdvert = function (advertsArray) {
  var advertElement = lodgeAdvertTemplate.cloneNode(true);

  advertElement.querySelector('.lodge__title').textContent = advertsArray.offer.title;
  advertElement.querySelector('.lodge__address').textContent = advertsArray.offer.address;
  advertElement.querySelector('.lodge__price').textContent = advertsArray.offer.price + '#x20bd;/ночь';
  advertElement.querySelector('.lodge__type').textContent = advertsArray.offer.type;
  advertElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advertsArray.offer.guests + 'гостей в ' + advertsArray.offer.rooms + 'комнатах';
  advertElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advertsArray.offer.checkin + ', выезд до ' + advertsArray.offer.checkout;
  var allFeatures = advertElement.querySelector('.lodge__features');
  for (var i = 0; i < advertsArray.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + advertsArray.offer.features[i];
    allFeatures.appendChild(span);
  }
  advertElement.querySelector('.lodge__description').textContent = advertsArray.offer.description;

  return advertElement;
};

var adverts = getRandomObject(ADVERT_AVATAR, ADVERT_TITLE, ADVERT_TYPE, ADVERT_CHECKIN_CHECOUT, ADVERT_FEATURES, ADVERT_COUNT);

var fragment = document.createDocumentFragment();
for (var i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderAdvert(adverts[i]));
}
dialogPanel.appendChild(fragment);

//pinListElement.appendChild(fragment);

