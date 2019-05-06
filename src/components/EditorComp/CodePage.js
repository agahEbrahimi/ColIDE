import React, { Component } from 'react';

import Tabs from './Tabs';
import Page from "./Page";


class CodePage extends Component {

    constructor(props){
        super(props);
        this.state={
            openFiles: [],
            tabs: [], 
        }
        this.processTabs = this.processTabs.bind(this);
        this.closeTabHandler = this.closeTabHandler.bind(this);
        this.addTab = this.addTab.bind(this);
        this.containsTab = this.containsTab.bind(this);
        this.tabsRef = React.createRef();
    }

    componentWillMount(){
        if(localStorage.getItem("col:getTabs")!==null && localStorage.getItem("col:getTabs").length>0){
            this.setState({openFiles: JSON.parse(localStorage.getItem("col:getTabs"))}, ()=>{
                this.tabsRef.current.setActive(this.state.openFiles[0].name);
                this.processTabs();
                this.forceUpdate();
            })
        }
        else{
            this.processTabs();
        }
    }

    containsTab(name){
        for(var i=0; i<this.state.openFiles.length; i++){
            if(this.state.openFiles[i].name===name){
                return true;
            }
        }
        return false;
    }

    addTab(name){
        var tempTabs = this.state.openFiles;
        if(name!==undefined && !this.containsTab(name)){
            console.log("asdasd");
            tempTabs.push({
                id: name,
                name: name
            });
            this.setState({openFiles:tempTabs}, ()=>{
                this.tabsRef.current.setActive(name);
                localStorage.setItem("col:getTabs", JSON.stringify(this.state.openFiles));
                this.processTabs();
                this.forceUpdate();
            });
        }
    }

    processTabs(){
        var retRend = [];

        for(var i=0; i<this.state.openFiles.length; i++){
            retRend.push(<div 
                label={this.state.openFiles[i].name} 
                key={this.state.openFiles[i].id} 
                id={this.state.openFiles[i].id}>
                    <Page label={this.state.openFiles[i].name}/>
                </div>)
            ;    
        }
        this.setState({tabs: retRend});
    }

    closeTabHandler(id){
        var fileArr = this.state.openFiles;
        var procArr = [];
        for(var i=0; i<fileArr.length; i++){
            if(fileArr[i].id!==id){
                procArr.push(fileArr[i]);
            }
        }
        this.setState({openFiles: procArr}, ()=>{
            localStorage.setItem("col:getTabs", JSON.stringify(this.state.openFiles));
            this.processTabs();
            this.forceUpdate();
        });
    }

    render() {
        return (
            <Tabs ref={this.tabsRef} contentPanes={this.state.contentPanes} files={this.state.openFiles} closeHandler={this.closeTabHandler}>
              {
                  this.state.tabs
              }
            </Tabs>
        );
    }
}

export default CodePage;