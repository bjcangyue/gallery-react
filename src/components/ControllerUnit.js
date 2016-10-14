/**
 * Created by zql on 2016/10/14.
 */
var React = require('react');

var ControllerUnit = React.createClass({
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
        var controllerUnitClassName = 'controller-unit';
        if (this.props.arrange.isCenter) {
            controllerUnitClassName += ' is-center';
            if (this.props.arrange.isInverse) {
                controllerUnitClassName +=' is-inverse';
            }
        }

        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        )
    }
});

module.exports = ControllerUnit;
