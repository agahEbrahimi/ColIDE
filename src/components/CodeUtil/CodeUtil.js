import React, { Component } from 'react';

import Terminal from "./Terminal";
import Console from "./Terminal";

class CodeUtil extends Component {

    constructor(props){super(props);}

    render() {
        return (
            <div id="codeUtil">
                <Console />
                <Terminal />
            </div> 
        );
    }
}

export default CodeUtil;