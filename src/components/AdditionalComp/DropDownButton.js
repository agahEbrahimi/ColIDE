import React, { Component } from 'react';



class DropDownButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: "dropBase",
            backStyle: "blur",
            text: this.props.text
        };
        this.leaveHandler = this.leaveHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    enterHandler() {
        this.setState({style: "drpBaseHover"});
    }
    leaveHandler() {
        this.setState({style: "dropBase"});
    }
    mouseDown(){
        this.setState({style: "drpBaseClick"})
        this.handleSubmit();
    }
    mouseUp(){
        setTimeout(function() {
            this.setState({style: "drpBaseHover"})
        }.bind(this), 100);
    }

    handleSubmit() {}

    render() {
        return (
            <div>
                <div id={this.state.backStyle}></div>
                <div id={this.state.style} className="drpBase" onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>{this.state.text}</div>
            </div>
            );
    }
}

export default DropDownButton;
