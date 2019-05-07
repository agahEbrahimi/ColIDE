import React, { Component } from 'react';


class Button extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.text,
        };
    }

    render() {
        return (
            <Button>Click Here</Button>
        );
    }
}

export default Button;
