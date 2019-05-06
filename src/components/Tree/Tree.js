import React from 'react';

import "../../css/Tree.css";
import Head from './Head';
import Node from "./Node";

const data = {
    folderRoots:[], 
}

class Tree extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            selected: "",
            data: []
        };
        this.process = this.process.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:4000/file/getFolder").then(res => res.text()).then(data => {
            var roots = this.state.data;
            roots.push(JSON.parse(data));
            this.setState({data: roots}, ()=>this.process());
        });
    }

    process(){
        var finalArr = []
        var headNodeArr = this.state.data;
        for(var i=0; i<headNodeArr.length; i++){
            var headNodeObj = headNodeArr[i];
            finalArr.push(<Head  key={i} depth={1} onHandleSelect={this.handleChange} children={headNodeObj["children"]} headName={headNodeObj["headName"]} />);
        }
        return finalArr;
    }

    handleChange(selectedF){
        const self = this;
        this.setState({selected: selectedF}, ()=>{
            const codePane = self.props.codePane.current;
            var bool = codePane.containsTab(self.state.selected);
            if(!bool){
                codePane.addTab(self.state.selected);
            }
            codePane.tabsRef.current.setActive(self.state.selected);
        });
    }

    render(){
        return (
            <div>
                <ul id="parentUL">
                {
                    this.process()
                }
                </ul>
                
            </div>
        );
    }
}

export default Tree;

           /* else{
                var nodeArr = data[key];
                for(var i=0; i<nodeArr.length; i++){
                    var nodeObj = nodeArr[i];
                    finalArr.push(<Node depth={1} onHandleSelect={this.handleChange} name={nodeObj["name"]} />)
                }
            }*/