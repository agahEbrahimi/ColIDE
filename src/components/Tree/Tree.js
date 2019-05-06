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
            selected: {},
            data: [],
            dirs: [], 
            unrendered: []
        };
        this.process = this.process.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.instantiateTree = this.instantiateTree.bind(this);
        this.updateTree = this.updateTree.bind(this);
        this.containsDir = this.containsDir.bind(this);
    }

    componentDidMount(){
        this.instantiateTree();
    }

    updateTree(dir, dirName){
        console.log(!this.containsDir(dir, dirName));
        if(!this.containsDir(dir, dirName)){
            var directoryObj = {loc:dir, name:dirName};
            var dirsObj = [];
            dirsObj.push(directoryObj);
            this.setState({unrendered: dirsObj}, ()=>{
                this.instantiateTree();
            });
        }
    }

    containsDir(dir, dirName){
        for(var i=0; i<this.state.dirs.length; i++){
            if(this.state.dirs[i].loc===dir && this.state.dirs[i].name===dirName){
                return true;
            }
        }
        return false;
    }

    instantiateTree(){
        const self = this;
        for(var i=0; i<this.state.unrendered.length; i++){
            const run = (i)=>{
                fetch('http://localhost:4000/file/getFolder', {
                    method: 'POST',
                    body: JSON.stringify({
                        dir: this.state.unrendered[i].loc,
                        dirName: this.state.unrendered[i].name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(results => results.text()).then(data => {
                    var modData = JSON.parse(data);
                    modData["dir"] = self.state.unrendered[i].loc.substring(0,self.state.unrendered[i].loc.lastIndexOf("/"));
                   
                    var roots = [];
                    roots.push(modData);

                    
                    this.setState({data: roots, unrendered:[]}, ()=>this.process());
                });
            };
            run(i);
        }
    }

    process(){
        var finalArr = []
        var headNodeArr = this.state.data;
        for(var i=0; i<headNodeArr.length; i++){
            var headNodeObj = headNodeArr[i];
            finalArr.push(<Head dir={headNodeObj["dir"]} key={i} depth={1} onHandleSelect={this.handleChange} children={headNodeObj["children"]} headName={headNodeObj["headName"]} />);
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
            codePane.tabsRef.current.setActive(self.state.selected["name"]); //update the tabs so you can open the same filename from different directories
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