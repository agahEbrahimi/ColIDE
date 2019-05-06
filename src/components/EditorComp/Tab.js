import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.closeHandler = this.closeHandler.bind(this);
    }

    onClick(){
        const { label, onClick } = this.props;
        onClick(label);
    }

    closeHandler(e){
        const {id, onClose} = this.props;
        onClose(id);
        e.stopPropagation();
    }  

    render() {
        const {onClick, onClose, props: { activeTab, label, id}} = this;
        let className = 'tab-list-item';
        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <li className={className} onClick={onClick} onMouseEnter={this.enterHandler} onMouseLeave={this.leaveHandler}>
                {label} 
                <img onClick={(e)=>this.closeHandler(e)} id="tabClose" src={require('../../img/closeTab.svg')} />
            </li>
        );
    }

    static propTypes = {
        activeTab: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };
}

export default Tab;
