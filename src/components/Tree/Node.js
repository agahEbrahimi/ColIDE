import React from 'react';

import "../../css/Tree.css";


class Node extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            type:"", 
            color:"unSelected"
        };
        this.changeProp = this.changeProp.bind(this);
    }
    changeProp(e){
        //this.props.onHandleSelect(this.state.name);    
        e.stopPropagation();
        if(this.state.color=="unSelected"){
            this.setState({color: "selected"});
        }
        else{
            this.setState({color: "unSelected"});
        }
        this.props.onHandleSelect(this.state.name);
    }
    render(){
        this.state.name = this.props.name;
        return (
            <li id={this.state.color} onClick={this.changeProp}>{this.state.name}</li>
        );
    }
}

export default Node;