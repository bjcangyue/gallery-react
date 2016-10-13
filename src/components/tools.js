/**
 * Created by zql on 2016/10/13.
 */
var tools = {};
tools.getRangeRandom = function (low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
};


module.exports = tools;
