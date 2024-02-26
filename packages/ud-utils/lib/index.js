'use strict';

/**
 * 判断字符串是否是空值 ex:0x0000000000000
 */
function isZero(hexNumberString) {
    return /^0x0*$/.test(hexNumberString);
}
/**
 * 数字格式化
 *
 * @param num 要格式化的数字
 * @param precision 保留几位小数。默认为2
 * @param noZero 小数位是否要补0 true：不需要补0  false：需要补0
 * @param delta 偏移量 默认为1不做偏移
 * @returnss {*}
 */
var formatCurrency = function (num, precision, noZero, delta) {
    if (precision === void 0) { precision = 2; }
    if (noZero === void 0) { noZero = false; }
    if (delta === void 0) { delta = 1; }
    // num = num || 4;
    if (num === undefined || num === '')
        return '';
    noZero = noZero || false;
    var x = Number(num) * delta;
    var f = parseFloat(x.toString());
    if (isNaN(f)) {
        return;
    }
    x = scientificNotationToString(x);
    var parts = x.toString().split('.');
    var integerPart = parts[0];
    var decimalPart = parts[1];
    if (decimalPart) {
        decimalPart = decimalPart.slice(0, precision);
    }
    var resolvedParts = parseFloat(decimalPart) ? integerPart + '.' + decimalPart : integerPart;
    f = resolvedParts;
    // var powNum = Math.pow(10, precision);
    // f = Math.floor(x * powNum) / powNum;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    if (!noZero) {
        while (s.length <= rs + precision) {
            s += '0';
        }
    }
    var ableAmountSplit = s.split('.');
    var ableAmountInteger = ableAmountSplit[0];
    var ableAmountDecimals = ableAmountSplit[1];
    for (var i = 0; i < Math.floor((ableAmountInteger.length - (1 + i)) / 3); i++) {
        ableAmountInteger = ableAmountInteger.substring(0, ableAmountInteger.length - (4 * i + 3)) + ',' + ableAmountInteger.substring(ableAmountInteger.length - (4 * i + 3));
    }
    if (ableAmountInteger.indexOf('-,') > -1) {
        ableAmountInteger = ableAmountInteger.replace('-,', '-');
    }
    if (ableAmountDecimals && ableAmountDecimals.length > 0) {
        return ableAmountInteger + '.' + ableAmountDecimals;
    }
    else {
        return ableAmountInteger;
    }
};
/**
 * 格式化成美元（只是在formatCurrency基础上加上美元符号）
 * 入参和出参和formatCurrency一致
*/
var formatToUsd = function (value, decimal, noZero, delta) {
    if (decimal === void 0) { decimal = 2; }
    return value !== undefined && value !== '' ? '$' + formatCurrency(value || 0, decimal, noZero, delta) : '';
};
/**
 * 格式化成百分比格式
 * @param value 要格式化的数字
 * @param decimal 保留几位小数。默认为2
 * @param delta 偏移量 默认为100
 * @returnss {*}
*/
var formatToPercent = function (value, decimal, delta) {
    if (decimal === void 0) { decimal = 2; }
    if (delta === void 0) { delta = 100; }
    return value !== undefined && value !== '' ? parseFloat((Number(value) * delta).toString()).toFixed(decimal) + '%' : '';
};
/**
 * 文字中间设置省略号
 * @param text 字符串
 * @param firstLen 前面保留字符数，默认为6
 * @param delta 后面保留字符数，默认为4
 * @returns {string} 处理后的字符串
 */
var formatStrMiddleEllipsis = function (text, firstLen, lastLen) {
    if (text === void 0) { text = ''; }
    if (firstLen === void 0) { firstLen = 6; }
    if (lastLen === void 0) { lastLen = 4; }
    if (text.length > lastLen + firstLen) {
        var all = text.length;
        var last = text.substring(all - lastLen);
        var first = text.substring(0, firstLen);
        return first + '...' + last;
    }
    else {
        return text;
    }
};
/**
 * @deprecated 直接使用日期库，moment或dayjs
*/
var formatDate = function (datetime, dateJoinSymbol, accurateToSeconds, timeJoinSymbol) {
    if (dateJoinSymbol === void 0) { dateJoinSymbol = '/'; }
    if (accurateToSeconds === void 0) { accurateToSeconds = false; }
    if (timeJoinSymbol === void 0) { timeJoinSymbol = ':'; }
    if (!datetime)
        return;
    var date = new Date(Number(datetime)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var year = date.getFullYear(), month = ('0' + (date.getMonth() + 1)).slice(-2), sdate = ('0' + date.getDate()).slice(-2), hour = ('0' + date.getHours()).slice(-2), minute = ('0' + date.getMinutes()).slice(-2), second = ('0' + date.getSeconds()).slice(-2);
    // 拼接
    var result = "".concat(year).concat(dateJoinSymbol).concat(month).concat(dateJoinSymbol).concat(sdate);
    if (accurateToSeconds) {
        result = "".concat(result, " ").concat(hour).concat(timeJoinSymbol).concat(minute).concat(timeJoinSymbol).concat(second);
    }
    // 返回
    return result;
};
var getBase64 = function (file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () { return resolve(reader.result); };
        reader.onerror = function (error) { return reject(error); };
    });
};
/**
*    秒转天
*    @param {number} second 秒
*    @returns {number} 天
**/
var secondToDay = function (second) {
    return second / 60 / 60 / 24;
};
var monthDayDiff = function (startTime, endTime) {
    // this指针
    var flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
    var start = new Date(startTime);
    var end = new Date(endTime);
    var year = end.getFullYear() - start.getFullYear();
    var month = end.getMonth() - start.getMonth();
    var day = end.getDate() - start.getDate();
    if (month < 0) {
        year--;
        month = end.getMonth() + (12 - start.getMonth());
    }
    if (day < 0) {
        month--;
        var index = flag.findIndex(function (temp) {
            return temp === start.getMonth() + 1;
        });
        var monthLength = void 0;
        if (index <= 6) {
            monthLength = 31;
        }
        else if (index > 6 && index <= 10) {
            monthLength = 30;
        }
        else {
            monthLength = 28;
        }
        day = end.getDate() + (monthLength - start.getDate());
    }
    var dateResult = [year, month, day];
    return dateResult;
};
function getWeek(timeStampMs) {
    var week;
    var weeks = [0, 1, 2, 3, 4, 5, 6];
    var date = new Date(timeStampMs);
    week = weeks[date.getDay()];
    return week;
}
//e+8=>'100000000'
function scientificNotationToString(param) {
    var _a, _b;
    var strParam = String(param);
    var flag = /e/.test(strParam);
    if (!flag)
        return param.toString();
    // 指数符号 true: 正，false: 负
    var sysbol = true;
    if (/e-/.test(strParam)) {
        sysbol = false;
    }
    // 指数
    var index = Number((_a = strParam.match(/\d+$/)) === null || _a === void 0 ? void 0 : _a[0]);
    // 基数
    var basis = (_b = strParam.match(/^[\d.]+/)) === null || _b === void 0 ? void 0 : _b[0].replace(/\./, '');
    var result;
    if (sysbol) {
        result = basis === null || basis === void 0 ? void 0 : basis.padEnd(index + 1, '0');
    }
    else {
        result = basis === null || basis === void 0 ? void 0 : basis.padStart(index + basis.length, '0').replace(/^0/, '0.');
    }
    return result || '';
}
function valueToPeriod(value) {
    var denominator, unit;
    if (value < 1000) {
        denominator = 1;
        unit = '';
    }
    else if (value < 1000000) {
        denominator = 1000;
        unit = 'K';
    }
    else if (value < 100000000) {
        denominator = 1000000;
        unit = 'M';
    }
    else {
        denominator = 1000000000;
        unit = 'B';
    }
    return {
        denominator: denominator,
        unit: unit,
    };
}
/**
* 大数字转带单位的数字
* 大于3位单位为k eg. 1001=>1.001k
* 大于6位单位为M eg. 1200000 => 1.2M
* 大于9位单位为B eg. 120000000 => 0.12B
*  @param {number} value 要转的数字
*  @param {number} maxValue 一堆数字中的最大数字，如果有值则单位按照这个最大数字来计算，否则单位根据实际传入数字计算
**/
function formatMoney(value, maxValue) {
    var _a = valueToPeriod(maxValue || value), denominator = _a.denominator, unit = _a.unit;
    return formatCurrency(value / denominator, 2) + '' + (value > 0 ? unit : '');
}
/**
 * 毫秒转成固定的日期文案
 * @param {number} millisecond 毫秒
 * @param {function} t 国际化
 * @param {number} minUnit 最小单位
 * @param {number} maxUnit 最大单位
 * minUnit或minUnit ：second: 0
 *                    minute: 1
 *                    hour:   2
 *                    day:    3
 *                    month:  4
 * @returns {string} 小于1小时=> xx minutes， 小24小时=> xx hours，小30天=> xx days，否则 xx months
 */
var textMap = {
    'zh-CN': {
        "minute": "分钟前",
        "minutes": "分钟前",
        "hour": "小时前",
        "hours": "小时前",
        "day": "天前",
        "days": "天前",
        "month": "个月前",
        "months": "个月前",
    },
    'en': {
        "minute": "minute ago",
        "minutes": "minutes ago",
        "hour": "hour ago",
        "hours": "hours ago",
        "day": "day ago",
        "days": "days ago",
        "month": "month ago",
        "months": "months ago",
    }
};
function formatTimeToDays(millisecond, lang, minUnit, maxUnit) {
    if (lang === void 0) { lang = 'zh-CN'; }
    if (minUnit === void 0) { minUnit = 1; }
    if (maxUnit === void 0) { maxUnit = 4; }
    var Hour1 = 1000 * 60 * 60; //一小时
    var Hour24 = Hour1 * 24; //24小时
    var Day30 = Hour24 * 30;
    var returnStr = '';
    if ((minUnit <= 1 && millisecond < Hour1) || (maxUnit === 1 && millisecond >= Hour1)) {
        //显示到分钟
        var returnVal = Math.ceil(millisecond / 1000 / 60);
        returnStr = "".concat(returnVal, " ").concat(returnVal === 1 ? textMap[lang].minute : textMap[lang].minutes);
    }
    else if ((minUnit <= 2 && millisecond < Hour24) || (maxUnit === 2 && millisecond >= Hour1)) {
        //显示到小时
        var returnVal = Math.ceil(millisecond / 1000 / 60 / 60);
        returnStr = "".concat(returnVal, " ").concat(returnVal === 1 ? textMap[lang].hour : textMap[lang].hours);
    }
    else if ((minUnit <= 3 && millisecond < Day30) || (maxUnit === 3 && millisecond >= Day30)) {
        //显示到天
        var returnVal = Math.ceil(millisecond / 1000 / 60 / 60 / 24);
        returnStr = "".concat(returnVal, " ").concat(returnVal === 1 ? textMap[lang].day : textMap[lang].days);
    }
    else if (minUnit <= 4 || maxUnit >= 4) {
        //显示到月
        var returnVal = Math.ceil(millisecond / 1000 / 60 / 60 / 24 / 30);
        returnStr = "".concat(returnVal, " ").concat(returnVal === 1 ? textMap[lang].month : textMap[lang].months);
    }
    return returnStr;
}
/**
 * //去掉日期数据中的T 和Z
 */
function dateUtc2Local(date_time) {
    // const date = new Date(+new Date(date_time)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    var date = new Date(date_time);
    return date;
}
function parseFromMillion(num) {
    return num / 100;
}
/*
 * url 目标url
 * arg 需要替换的参数名称
 * arg_val 替换后的参数的值
 * return url 参数替换后的url
 */
function changeURLArg(url, arg, arg_val) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    }
    else {
        if (url.match('[?]')) {
            return url + '&' + replaceText;
        }
        else {
            return url + '?' + replaceText;
        }
    }
}
/**
 * 保留小数
 * @param {string | number} val  数值
 * @param {string} decimals 保留的位数
 */
var fixedDecimals = function (val, decimals) {
    if (!val || !decimals)
        return String(val);
    var splitVal = String(val).split('.');
    var intVal = splitVal[0];
    var decimalVal = splitVal[1];
    var res;
    if (decimalVal && decimalVal.length > decimals) {
        //超出精度，截取
        res = Number(val).toFixed(decimals);
    }
    else if (decimalVal || splitVal.length > 1) {
        //有小数位，或者只有一个点合并
        res = intVal + '.' + decimalVal;
    }
    else {
        //整数
        res = intVal;
    }
    return res;
};

exports.changeURLArg = changeURLArg;
exports.dateUtc2Local = dateUtc2Local;
exports.fixedDecimals = fixedDecimals;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatMoney = formatMoney;
exports.formatStrMiddleEllipsis = formatStrMiddleEllipsis;
exports.formatTimeToDays = formatTimeToDays;
exports.formatToPercent = formatToPercent;
exports.formatToUsd = formatToUsd;
exports.getBase64 = getBase64;
exports.getWeek = getWeek;
exports.isZero = isZero;
exports.monthDayDiff = monthDayDiff;
exports.parseFromMillion = parseFromMillion;
exports.scientificNotationToString = scientificNotationToString;
exports.secondToDay = secondToDay;
