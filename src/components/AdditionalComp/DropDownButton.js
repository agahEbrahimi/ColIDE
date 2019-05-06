import React, { Component } from 'react';



class DropDownButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: "dropBase",
            backStyle: "blur",
            text: this.props.text, 
        };
        this.properties = this.props.properties;
        this.leaveHandler = this.leaveHandler.bind(this);
        this.enterHandler = this.enterHandler.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.propComp = this.propComp.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.extRef = React.createRef();
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

    handleSubmit() {
        if(this.properties["hasFile"] === true){
            this.extRef.current.click();
            this.mouseUp();
        }
        else{
            this.props.submitUpwards(this.state.text, null);
        }
    }

    changeHandler(e){
        const files = e.target.files;
        this.props.submitUpwards(this.state.text, files);
    }

    propComp(){
        if(this.properties["hasFile"]===true){
            const input = <input id="input" ref={this.extRef} type="file" onChange={this.changeHandler} multiple="" webkitdirectory="" />
            return input;
        }
    }

    render() {
        return (
            <div>
                <div id={this.state.backStyle}></div>
                <div id={this.state.style} className="drpBase" onMouseUp={this.mouseUp} onMouseDown={this.mouseDown} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>
                    {this.state.text}
                    {
                        this.propComp()
                    }
                </div>
            </div>
            );
    }
}

export default DropDownButton;
