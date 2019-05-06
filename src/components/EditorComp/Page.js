import React, { Component } from 'react';
import Monaco from "../Editor/Editor";
class Page extends Component {

    constructor(props){super(props);}

    render() {
        return (
            <div id="fullHeight">
                <Monaco dir={this.props.dir} name={this.props.label} />
            </div> 
        );
    }
}

export default Page;