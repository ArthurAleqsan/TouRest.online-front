import moment from 'moment';



export const makePath = str => str.toLowerCase().split(' ').join('-');

export const shuffle = array => [...array].sort(() => Math.random() - 0.5);

export const hasText = text => Boolean(text);

export const isValidObject = obj => {
    for (const key in obj) {
        if (!obj[key]) return false;
    }
    return true;
}
export const removeFromArray = (array, findFn) => {
    const index = array.findIndex(findFn);
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
}
export const getIdFromPath = (path, separator) => path.split(separator)[1];

export const makeRoundedRate = rate => {
    const roundedRate = rate - Math.floor(rate) > 0.5 ? Math.ceil(rate) : Math.floor(rate) + 0.5;
    return roundedRate;
}
export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

export const makeArrayFromString = str => str.split(';');

export const isEmail = str => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(str).toLowerCase());
}
export const isValidCardHolderName = str => str.includes(' ');

export const isValidCardNo = str => typeof + str === 'number' && !isNaN(+str);

export const isValidCVV2 = str => str.length === 3 && isValidCardNo(str);

export const getAviableDays = (arr) => {
    const days = arr.map(day => moment(day).format('dddd'));
    return [...new Set(days)];
}
export const getLngKey = str => str.substring(0, str.length - 1).toLowerCase();
export const substringText = (text, maxSize) => {
    const newText = text.length > maxSize ? text.substring(0, maxSize) + '...' : text;
    return newText;
}
export const replaceCitisChars = (city) => {
    return city.split('-').join(' ')
};


export const timeConversion = (millisec) => {
    let time
    const hours = (millisec / (1000 * 60 * 60)).toFixed(0);
    // if (millisec % (1000 * 60 * 60) != 0) {
    //     time = hours + ':' + ((millisec % (1000 * 60 * 60) / (1000 * 60)).toFixed(1));
    // } else {
    //     time = hours;
    // }

    return hours;
}

