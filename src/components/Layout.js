import React, { Component } from 'react';

import '../css/Sidebar.css';
import '../css/Topbar.css';
import '../css/App.css';
import '../css/Tabs.css';
import '../css/Button.css';
import '../css/CodeUtil.css';

import Sidebar from "./Sidebar/Sidebar";
import Topbar from './Topbar/Topbar';
import CodePage from './EditorComp/CodePage';
import CodeUtil from './CodeUtil/CodeUtil';

const { remote, ipcRenderer } = require('electron');

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleClose = this.handleClose.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.handleMin = this.handleMin.bind(this);

    this.codePane = React.createRef();
    this.sideBar = React.createRef();
  }
  
  handleClose(){
    remote.app.quit();
  }
  
  handleMax(){
    const currentWindow = remote.getCurrentWindow();
    if(currentWindow.isMaximized()) {
      currentWindow.unmaximize();
    } 
    else {
      currentWindow.maximize();
    }
  }  

  handleMin(){
    remote.getCurrentWindow().minimize();
  }

  render() {
    return (
      <div>
        <div className="Topbar">
          <img id="close" onClick={this.handleClose} src={require("../img/close.svg")}/>
          <img id="max" onClick={this.handleMax} src={require("../img/max.svg")}/>
          <img id="min" onClick={this.handleMin} src={require("../img/min.svg")}/>
          <Topbar sideBar={this.sideBar}/>
        </div>
        <div id="MainPage">
          <div className="SideBarPanel">
              <Sidebar ref={this.sideBar} codePane={this.codePane}/>
          </div>
          <div id="RightAllign">
            <CodePage ref={this.codePane}/>
            <CodeUtil />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
