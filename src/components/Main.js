require('normalize.css/normalize.css');
require('styles/App.scss');

//import React from 'react';
var React = require('react');
var ReactDOM = require('react-dom');

var tools = require('./tools.js');
var ImgFigure = require('./ImgFigure.js');
var ControllerUnit = require('./ControllerUnit.js');

//从json文件获取图片数据;
var imageDatas = require('../data/imageDatas.json');


//利用闭包对数据进行处理(将图片名转成图片路径)；
imageDatas = (function genImageUrl(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageUrl = require('../images/' + singleImageData.filename);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);


var AppComponent = React.createClass({
    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: {  //九宫格之水平方向的取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]

        },
        vPosRange: {  //九宫格之垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    },
    inverse:function(index){
        return function(){
            var imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr:imgsArrangeArr
            });
        }.bind(this);

    },
    center:function(index){
        return function(){
            this.rearrange(index);
        }.bind(this)
    },
    rearrange: function (centerIndex) {    //重新布局所有图片
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,
            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), //顶部图片的数量为0或1;
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
        //首先居中centerIndex的图片
        imgsArrangeCenterArr[0] = {
            pos:centerPos,
            rotate:0,
            isCenter:true
        };

        //取出并布局上侧图片的信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));

        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: tools.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: tools.getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: tools.get30DegRandom(),
                isCenter:false
            };
        });

        //布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX;
            imgsArrangeArr[i] = {
                pos: {
                    top: tools.getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: tools.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: tools.get30DegRandom(),
                isCenter:false
            };
        }

        //将上部的图片再插入imgsArrangeArr
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        //将中间区域的图片插入到imgsArrangeArr
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });


    },
    getInitialState: function () {
        return {
            imgsArrangeArr: [
                {
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate: 0,
                    isInverse:false,
                    isCenter:false
                }
            ]
        };
    },
    componentDidMount: function () {
        //拿到舞台的大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到imgfigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };

        // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);
    },
    render() {
        var controllerUnits = [],
            imgFigures = [];
        imageDatas.forEach(function (value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse:false,
                    isCenter:false
                }
            }
            imgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure'+index}
                                       arrange={this.state.imgsArrangeArr[index]} inverse = {this.inverse(index)} center={this.center(index)}/>);
            controllerUnits.push(<ControllerUnit key={index} arrange = {this.state.imgsArrangeArr[index]} inverse = {this.inverse(index)} center={this.center(index)}></ControllerUnit>);
        }.bind(this));
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});
module.exports = AppComponent;


