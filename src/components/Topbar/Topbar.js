import React, { Component } from 'react';

import '../../css/Topbar.css';
import Button from "../AdditionalComp/Button.js";
var fileData = require('../../Items/File.json'); 
var editData = require('../../Items/Edit.json'); 
var viewData = require('../../Items/View.json'); 
var windowData = require('../../Items/Window.json'); 
var helpData = require('../../Items/Help.json'); 



class Topbar extends Component {

    constructor(props){
        super(props);   
        this.clickEvent = this.clickEvent.bind(this); 
    }  

    clickEvent(clickedButton, extOpt){
        const treeRef = this.props.sideBar.current.controllerRef.current.treeRef.current;
        switch(clickedButton){
            case "Open Directory...":
                treeRef.updateTree(extOpt[0].path, extOpt[0].name);
        }

    }

    render() {
        return (
            <div id="leftMargin">
                <Button submitUpwards={this.clickEvent} obj={fileData} text="File"/>
                <Button submitUpwards={this.clickEvent} obj={editData} text="Edit"/>
                <Button submitUpwards={this.clickEvent} obj={viewData} text="View"/>
                <Button submitUpwards={this.clickEvent} obj={windowData} text="Windows"/>
                <Button submitUpwards={this.clickEvent} obj={helpData} text="Help"/>
            </div> 
        );
    }
}

export default Topbar;
