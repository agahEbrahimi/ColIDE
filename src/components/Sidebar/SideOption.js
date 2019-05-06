import React from 'react';

class SideOption extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            selected: "",
        };
        this.changeProp = this.changeProp.bind(this);
    }

    changeProp(selectedOption){
        this.props.onHandleChange(selectedOption);            
    }

    render(){
        this.state.selected = this.props.selected;
        return (
            <div>
               <div id="close-btn" className= "Sidebar">
                    <div onClick={()=> this.changeProp("Workspace")}>
                        <img id="fImage" src={require('../../img/edit.svg')} />
                    </div>
                    <div onClick={()=> this.changeProp("Test")}>
                        <img src={require('../../img/play.svg')} />
                    </div>
                    <div onClick={()=> this.changeProp("Git")}>
                        <img src={require('../../img/git.svg')} />
                    </div>
                    <div onClick={()=> this.changeProp("User")}>
                        <img src={require('../../img/avatar.svg')} />
                    </div>
                    <div onClick={()=> this.changeProp("Security")}>
                        <img src={require('../../img/security.svg')} />
                    </div>
                    <div onClick={()=> this.changeProp("Settigns")}>
                        <img src={require('../../img/settings.svg')} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SideOption;