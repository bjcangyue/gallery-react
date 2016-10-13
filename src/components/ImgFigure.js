/**
 * Created by zql on 2016/10/12.
 */
import React from 'react';
var ReactDOM = require('react-dom');

var ImgFigure = React.createClass({
    render:function(){
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageUrl} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
});

module.exports = ImgFigure;
