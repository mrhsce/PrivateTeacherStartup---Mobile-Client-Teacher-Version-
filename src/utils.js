import {persistStore} from './stores';
import {create} from 'mobx-persist';
import {AsyncStorage, KeyboardAvoidingView, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';

// import Toast from 'react-native-simple-toast';
import React from 'react';

const jMoment = require('moment-jalaali');
// import {SERVER_ADDRESS} from '../server_config';

// var serverUrl;

export async function fetchFactory(url, options) {
  const {body, ...rest} = options;
  console.warn('fetchFactory utils serverURL: ', persistStore.serverUrl);
  console.warn('fetchFactory utils url: ', url);
  console.warn('fetchFactory utils body: ', body);
  const response = await fetch(persistStore.serverUrl + url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + persistStore.token,
    },
    body: JSON.stringify(body),
    ...rest,
  });

  if (response.status !== 200) {
    console.warn(
      '%%%%%%%%%%%%%%%% fetchFactory errMessage: ',
      unicodeToChar(response.headers.get('errMessage')),
    );
    Toast.show(unicodeToChar(response.headers.get('errMessage')), Toast.LONG);
  }

  return response;
}

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function(match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

export async function uploadFile(path) {
  const body = new FormData();
  const photo = {
    uri: path,
    type: 'image/jpeg',
    name: 'image.jpg',
  };
  body.append('userFile', photo);

  const response = await fetch(persistStore.serverUrl + '/upload', {
    method: 'POST',
    body,
    headers: {
      Authorization: 'Bearer ' + persistStore.token,
    },
  });

  if (response.ok) {
    return await response.json();
  }
}

export function parseTimeToJalaali(date, isTime = true) {
  return (
    jMoment(date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD') +
    (isTime ? '   ' + jMoment(date, 'YYYY-M-D HH:mm:ss').format('HH:mm') : '')
  );
}

export function getTimeJalaaliNow() {
  return jMoment().format('jYYYY/jM/jD HH:mm');
}

export function parseTimeToString(time) {
  let timeString = ':';
  if (time.getHours() < 10) {
    timeString = '0' + time.getHours() + timeString;
  } else {
    timeString = time.getHours() + timeString;
  }

  if (time.getMinutes() < 10) {
    timeString = timeString + '0' + time.getMinutes();
  } else {
    timeString = timeString + time.getMinutes();
  }
  return timeString;
}

export function mapNumbersToEnglish(string) {
  return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function(c) {
    return c.charCodeAt(0) & 0xf;
  });
}

export function inputNumberValidation(
  string,
  beforeValue,
  validRegex = /[\d-.]+$/,
) {
  let text = mapNumbersToEnglish(string);
  if (text.length > 0 && !validRegex.test(text)) {
    text = beforeValue;
  }
  return text;
}

export function toPersianNum(string) {
  let persianNums = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return string.replace(/[0-9]/g, function(c) {
    return persianNums[c.charCodeAt(0) - 48];
  });
}

export function priceFormatter(price) {
  let formattedPrice = '';
  let index = 1;
  while (price > 0) {
    formattedPrice = (price % 10) + formattedPrice;
    price = Math.floor(price / 10);
    if (index % 3 === 0 && price !== 0) {
      formattedPrice = ',' + formattedPrice;
    }
    index++;
  }
  return formattedPrice;
}

export function commaSeparate(digits) {
  let ss = '';
  // StringBuilder ss = new StringBuilder();
  let count = 0;
  if (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
      count++;
      if (count === 3 && i !== 0) {
        count = 0;
        ss = ss + digits.charAt(i);
        ss = ss + ',';
      } else {
        ss = ss + digits.charAt(i);
      }
    }
  }
  return ss;
}

export async function fetchStore() {
  const hydrate = create({
    storage: AsyncStorage,
    jsonify: true,
  });
  await hydrate('persistStore', persistStore);
}

export function inputPriceFormatter(inputPrice) {
  if (inputPrice === '') {
    return '';
  }
  let formattedPrice = '';
  let price = parseInt(inputPrice.replace(/\D/g, ''));
  let index = 1;
  while (price > 0) {
    formattedPrice = (price % 10) + formattedPrice;
    price = Math.floor(price / 10);
    if (index % 3 === 0 && price !== 0) {
      formattedPrice = ',' + formattedPrice;
    }
    index++;
  }
  return formattedPrice;
}

export function clearPriceFormat(inputPrice) {
  if (inputPrice === '') {
    return '';
  }
  return inputPrice.replace(/\D/g, '');
}

export async function sleep(time) {
  return await new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export function getFileDownloadURL(filename) {
  console.warn('&&&&&&&&&& getFileDownloadURL filename: ', filename);
  if (filename && filename !== '') {
    return persistStore.serverUrl + uploadUrl + '/' + filename;
  }
  return null;
}

export function isValidate(item, type = 'isEmpty') {
  switch (type) {
    case 'isEmpty':
      console.warn('isValidate: Type isEmpty', item);
      if (item == null) {
        console.warn('isValidate: Null');
        return false;
      } else if (Array.isArray(item)) {
        console.warn('*********** isValidate: Array', item);
        return item && item.length > 0;
      } else if (
        item instanceof String ||
        Object.prototype.toString.call(item) === '[object String]'
      ) {
        console.warn('isValidate: String', item);
        return !!item;
        // if (!item) {
        //   // console.warn("isValidate: String", false);
        //   return false;
        // } else {
        //   // console.warn("isValidate: String", true);
        //   return true;
        // }
      } else {
        return false;
      }
    default:
      console.warn('isValidate: default False....', item);
      return false;
  }
}

export function cardFormat(value) {
  if (value) {
    value = mapNumbersToEnglish(value);
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join('-');
    } else {
      return value;
    }
  } else {
    return '';
  }
}

export function OsDependantKeyboardAvoidingView(props) {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding">
      {props.children}
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView>{props.children}</KeyboardAvoidingView>
  );
}
