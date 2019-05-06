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
    }  

    render() {
        return (
            <div id="leftMargin">
                <Button obj={fileData} text="File"/>
                <Button obj={editData} text="Edit"/>
                <Button obj={viewData} text="View"/>
                <Button obj={windowData} text="Windows"/>
                <Button obj={helpData} text="Help"/>
            </div> 
        );
    }
}

export default Topbar;
