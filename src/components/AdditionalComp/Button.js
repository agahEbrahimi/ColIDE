import React, { Component } from 'react';

import OutsideClick from "./OutsideAlert";

class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: "base",
            menuVisibility: "drpBaseHidden",
            text: this.props.text,
            dropDownItems: this.props.json
        };
        this.leaveHandler = this.leaveHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.dropDownRef= React.createRef();
        this.currRef = React.createRef();
    }

    enterHandler() {
        this.setState({style: "hover"});
    }
    leaveHandler() {
        this.setState({style: "base"});
    }
    mouseDown(){
        this.dropDownRef.current.changeState();
        this.setState({style: "click"})
    }
    mouseUp(){
        this.setState({style: "hover"})
    }

    handleClick(){
        this.dropDownRef.current.changeState();
    }

    render() {
        return (
            <div ref={this.currRef} id="left">
                <a id={this.state.style} className="base" onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>{this.state.text}</a>
                <OutsideClick submitUpwards={this.props.submitUpwards} obj={this.props.obj} ref={this.dropDownRef} dropDownItems={this.state.dropDownItems} parentRef={this.currRef}/>
            </div>
        );
    }
}

export default Button;
