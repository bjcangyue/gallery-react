/**
 * Created by zql on 2016/10/12.
 */
import React from 'react';
//var ReactDOM = require('react-dom');

var ImgFigure = React.createClass({
    handleClick: function (e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },
    render: function () {
        var styleObj = this.props.arrange.pos ? this.props.arrange.pos : {};
        if (this.props.arrange.rotate) {
            (['MozTransform', 'OTransform', 'msTransform', 'WebkitTransform','transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }
        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }

        var imgFigureClassName = 'img-figure';
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.description}
                        </p>
                    </div>
                </figcaption>
            </figure>
        )
    }
});

module.exports = ImgFigure;
