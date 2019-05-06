import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';

class Tabs extends Component {

  constructor(props) {
    super(props);

    this.state = {
      children: this.props.children,
      activeTab: this.props.active,
    };

    this.onClickTabItem = this.onClickTabItem.bind(this);
    this.closeTabHandler = this.closeTabHandler.bind(this);
    this.syncTabs = this.syncTabs.bind(this);
    this.setLabel = this.setLabel.bind(this);
  }

  setActive(name){
    this.setState({activeTab: name}, ()=>{
      this.forceUpdate();
    })
  }

  componentWillMount(){
    this.setLabel();
  }
  
  setLabel(){
    if(this.props.children.length>0){
      this.setState({activeTab: this.props.children[0].props.label});
    }
    else{
      this.setState({activeTab: ""});
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  closeTabHandler = (id) => {
    const {closeHandler, files} = this.props;
    closeHandler(id);
    this.setState({activeTab: this.syncTabs(files, id)}, ()=>{
      this.forceUpdate();
    });
  }
  
  syncTabs(files, id){
    var processedFiles = []
    var index = 0;

    for(var i=0; i<files.length; i++){
        if(files[i].id==id){
          index = i;
        }
        else{
          processedFiles.push(files[i].name);
        }
    }
    if(index>=0 && processedFiles.length>0){
      if(index==0){
        return processedFiles[0];
      }
      else{
        return processedFiles[index-1];
      }
    }
    else{
      return "";
    }
  }

  render() {
    return (
      <div className="tabs">
        <ol className="tab-list">
          {this.props.children.map((child) => {
            const { label, id } = child.props;
            return (
              <Tab
                activeTab={this.state.activeTab}
                key={label}
                id={id}
                label={label}
                onClick={this.onClickTabItem}
                onClose={this.closeTabHandler}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {
            this.props.children.map((child) => {
              if (child.props.label == this.state.activeTab){
                return child.props.children;
              } 
              else{
                return undefined;
              }
            })
          }
        </div>
      </div>
    );
  }

  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }
}

export default Tabs;