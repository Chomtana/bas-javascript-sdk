"use strict";
exports.__esModule = true;
exports.sortHasEventData = exports.sortEventData = void 0;
var compareTwoEventsFn = function (a, b) {
    if (a.blockNumber !== b.blockNumber) {
        return a.blockNumber - b.blockNumber;
    }
    else if (a.transactionIndex !== b.transactionIndex) {
        return a.transactionIndex - b.transactionIndex;
    }
    return a.logIndex - b.logIndex;
};
var sortEventData = function (a, b, c) {
    if (b === void 0) { b = []; }
    if (c === void 0) { c = []; }
    var fn = function (a, b) {
        return compareTwoEventsFn(a, b);
    };
    return a.concat(b, c).sort(fn);
};
exports.sortEventData = sortEventData;
var sortHasEventData = function (a, b, c) {
    if (b === void 0) { b = []; }
    if (c === void 0) { c = []; }
    var fn = function (a, b) {
        return compareTwoEventsFn(a.event, b.event);
    };
    return a.concat(b, c).sort(fn);
};
exports.sortHasEventData = sortHasEventData;
