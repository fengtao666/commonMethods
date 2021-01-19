const goto = (target, blank = true) => {
    const url = target;
    window.open(url, blank ? '_blank' : '_self');
};

const isEmptyObject = (obj) => {
    if (!obj) {
        return true;
    }
    for (const key in obj) {
        return false;
    }
    return true;
};

const testObj = { a: 123, b: 456, c: { dd: 'haha' } };

const safeGet = (obj, key, defVal) => {
    let val = defVal;
    if (obj && typeof key === 'string' && key !== '') {
        const keys = key.split('.');
        console.log('keys', keys);
        let value = obj;
        for (const i in keys) {
            if (typeof value === 'object') {
                value = value[keys[i]];
            } else {
                break;
            }
        }
        if (typeof value !== 'undefined') {
            val = value;
        }
    }
    return val;
};


const createUniqueId = () => {
    let lastId = window.btoa(`${new Date().getTime() - 1548145349476}`);
    return () => {
        let newId = lastId;
        while (newId === lastId) { // 确保连续调用 createUniqueId 能得到不同的 id
            const s = window.btoa(`${new Date().getTime() - 1548145349476}`);
            newId = s.replace(/=/g, '');
        }
        lastId = newId;
        return lastId;
    };
};

// 防抖
function debounce(fn, interval = 300) {
    let timeout = null;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, interval);
    };
}
// 节流
function throttle(fn, interval = 300) {
    let last = null;

    return function () {
        const now = Number(new Date());
        if (!last || now - last > interval) {
            fn();
            last = now;
        }
    };
}

function parseDate(time) {
    if (!time) {
        time = Date.now();
    }

    const date = new Date(time);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    const second = String(date.getSeconds());
    return {
        year,
        month: month.length > 1 ? month : `0${month}`,
        day: day.length > 1 ? day : `0${day}`,
        hour: hour.length > 1 ? hour : `0${hour}`,
        minute: minute.length > 1 ? minute : `0${minute}`,
        second: second.length > 1 ? second : `0${second}`,
    };
}

function formatTime(time, formatStr = 'yyyy-mm-dd hh:mi:ss') {
    if (!time) {
        return '';
    }
    const result = parseDate(time);
    const { year, month, day, hour, minute, second } = result;

    return formatStr.replace('yyyy', year).replace('mm', month).replace('dd', day).replace('hh', hour).replace('mi', minute).replace('ss', second);
}

const getQueryParams = (location = window.location.href) => {
    const url = decodeURIComponent(location);
    const splitIndex = url.indexOf('?') + 1;
    let paramStr = url.substr(splitIndex);
    paramStr = paramStr.split('#')[0];

    if (splitIndex < 1 || !paramStr) {
        return {};
    }
    const arr = paramStr.split('&');
    const obj = {};
    let tmp, val;

    for (let i = 0; i < arr.length; i++) {
        tmp = arr[i].split('=');
        val = decodeURIComponent(tmp[1]);
        obj[tmp[0]] = val;
    }
    return obj;
};
// 数组切割
function group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}
const arr = [1,2,3,4,5,6,7,8,9,9,3]
var newArr = group(arr, 5)
console.log('newArr', newArr);