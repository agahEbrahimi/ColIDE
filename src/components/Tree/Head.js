import React from 'react';

import "../../css/Tree.css";
import Node from "./Node";


class Head extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            className: "nested",
            headName: this.props.headName, 
            children: this.props.children, 
            depth: this.props.depth,
            span: "caret",
            color: "black"
        };
        this.onClick = this.onClick.bind(this);
        this.depthCheck = this.depthCheck.bind(this);
        this.process = this.process.bind(this);
    }

    process(object){
        var finalArr = []
        for(var i=0; i<object.length; i++){
            var nodeObj = object[i];
           if(object[i]["type"]=="node"){
                finalArr.push(<Node depth={this.state.depth+1} name={nodeObj["name"]} onHandleSelect={this.props.onHandleSelect}/>)
           }
           else if(object[i]["type"]=="head"){
                finalArr.push(<Head depth={this.state.depth+1} headName={nodeObj["headName"]} children={nodeObj["children"]} onHandleSelect={this.props.onHandleSelect}/>)
           }
        }
        return finalArr;
    }

    onClick (e){
        if(this.state.className=="nested"){
            this.setState({className:"active", span:"caretDown", color:"white"});
        }
        else{
            this.setState({className:"nested", span:"caret", color:"black"});
        }
        e.stopPropagation();
        //this.props.onHandleSelect(this.state.headName);            
    }

    depthCheck(){
        if(this.state.depth==1){
            return(
                <ul id="ulNoPad">
                    <ul className={this.state.className}>
                        {
                            this.process(this.state.children)
                        }
                    </ul>
                </ul>
            );
        }
        else{
            return(
                <ul className={this.state.className}>
                    {
                        this.process(this.state.children)
                    }
                </ul>
            );
        }
    }

    render(){
        return (
            <li onClick={this.onClick}><span className={this.state.span}> <a  id={this.state.color}>{this.state.headName}</a></span>
                {
                    this.depthCheck()
                }
            </li>
        );
    }
}


export default Head;