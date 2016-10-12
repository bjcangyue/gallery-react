require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//从json文件获取图片数据;
var imageDatas = require('../data/imageDatas.json');
console.log(imageDatas);


//利用闭包对数据进行处理(将图片名转成图片路径)；
imageDatas = (function genImageUrl(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageUrl = require('../images/' + singleImageData.filename);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);
console.log(imageDatas);


class AppComponent extends React.Component {
    render() {
        return (
            <section className="stage">
                <section className="img-sec"></section>
                <nav className="controller-nav"></nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
