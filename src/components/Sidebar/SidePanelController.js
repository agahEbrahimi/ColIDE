import React from 'react';

import Tree from "../Tree/Tree";

class SidePanelController extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            selected: "Workspace",
        };
        this.optionChecker = this.optionChecker.bind(this);

    }
    optionChecker() {
        switch(this.state.selected) {
          case 'Workspace':
            return <Tree codePane={this.props.codePane}/>;
          case 'Git':
            return <div>Git</div>;
          default:
            return null;
        }
      }
    render(){
        this.state.selected = this.props.selected;
        return (
          <div>     
            <div id="heading">{this.state.selected}</div>           
            <div id={this.state.selected}>
               {
                   this.optionChecker()
               }
            </div>
          </div>
        );
    }
}

export default SidePanelController;