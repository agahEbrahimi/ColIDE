import React, { Component } from 'react';

import OutsideClick from "./OutsideAlert";

class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: "base",
            text: this.props.text,
        };
        this.leaveHandler = this.leaveHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    enterHandler() {
        this.setState({style: "hover"});
    }
    leaveHandler() {
        this.setState({style: "base"});
    }
    mouseDown(){
        this.setState({style: "click"})
    }
    mouseUp(){
        this.setState({style: "hover"})
    }

    handleClick(){
        this.props.changeActive()
    }

    render() {
        return (
            <div id="left">
                <a id={this.state.style} className="base" onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>{this.state.text}</a>
            </div>
        );
    }
}

export default Button;
