import React, { Component } from 'react';

import DropDownButton from "./DropDownButton"

class OutsideClick extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuVisibility: "drpBaseHidden",
            parentRef: this.props.parentRef, 
            object: this.props.obj
        };
        this.handleClick = this.handleClick.bind(this);
        this.DropDownRender = this.DropDownRender.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    handleClick(e){
        if(this.node.contains(e.target) || this.state.parentRef.current.contains(e.target)){
            return;
        }
        else{
            if(this.state.menuVisibility="drpBase"){
                this.setState({menuVisibility: "drpBaseHidden"})
            }
        }
    }
    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false);
    }
    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    DropDownRender(){
        const self = this;
        return (
            <div className={this.state.menuVisibility} id="dropDownMenu">
                {
                    Object.keys(this.state.object).map(function(keyName, keyIndex) {
                        return(<DropDownButton submitUpwards={self.props.submitUpwards} id="" key={keyName} text={keyName} properties={self.state.object[keyName]}/>);
                    })
                }
            </div>
        );
    }
    changeState(){
        this.setState({menuVisibility:"drpBase"});
    }
    render() {
        return (
            <div ref={node => this.node=node}>
                {
                    this.DropDownRender()
                }
            </div>
        );
    }
}

export default OutsideClick;
