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
        const nodeObj = {
            "name": this.state.name,
            "dir": this.props.dir+"/"
        }
        this.props.onHandleSelect(nodeObj);
    }
    render(){
        this.state.name = this.props.name;
        return (
            <li id={this.state.color} onClick={this.changeProp}>{this.state.name}</li>
        );
    }
}

export default Node;