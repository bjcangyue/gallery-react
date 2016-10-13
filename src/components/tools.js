/**
 * Created by zql on 2016/10/13.
 */
var tools = {};

//获取区间内的随机数
tools.getRangeRandom = function (low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
};

//获得正负30度这间的随机角度
tools.get30DegRandom = function () {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
};


module.exports = tools;
