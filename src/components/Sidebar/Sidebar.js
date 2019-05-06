import React from 'react';

import SideOption from './SideOption';
import SidePanelController from "./SidePanelController";


class Sidebar extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            selected: "Workspace"
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(selectedOption) {
        this.setState({selected: selectedOption});
    }
    render(){
        return (
            <div id="optionParent">
                <div id="optionBar">
                    <SideOption onHandleChange={this.handleChange}/>
                </div>

                <div id="optionPanel">
                    <SidePanelController codePane={this.props.codePane} selected={this.state.selected}/>
                </div>
            </div>
        );
    }
}

export default Sidebar;