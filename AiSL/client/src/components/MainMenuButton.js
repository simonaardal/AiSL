import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import "./MainMenuButton.css"

/**
 * class @MainMenuButton
 * Shows the back to menu button on the recording screens.
 */
class MainMenuButton extends Component {
    /**
     * Renders, showing the component on screen.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div id={"mainMenuButtonContainer"}>
                <Button href={"#/mode"} id={"mainMenuButton"}>Return to Menu</Button>
            </div>
            )
    }
}

export default MainMenuButton;