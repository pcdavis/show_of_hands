import React from "react";
import Button from 'react-bootstrap/lib/Button';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(Button, 'custom');

export default class CustomButton extends React.Component {
    render() {
        var styles={
            "backgroundColor" : "purple",
            "border" : "purple",
            "color"           : "white"
        };
        return (
            <div>
                <Button style={styles} bsStyle="primary">Custom</Button>
            </div>
        );
    }
}

