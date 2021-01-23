import React, { Component } from "react";
import "./MainMenu.css"
import pic from "../res/asl.jpeg"
import Footer from "./Footer";
import {Button} from "@material-ui/core";
import "./SharedClasses.css"

/**
 * @class MainMenu
 * This class is the main menu of the application, and serves as a natural starting point for the user.
 */
class MainMenu extends Component{
    /**
     * @returns {JSX.Element}
     * Renders the component, thus showing the main menu on screen.
     */
    render(){
        return(
            <div id={"mainMenuWrapper"}>
                    <div id={"mainMenuContentWrapper"}>
                        <div id={"mainMenuContent"}>
                            <div id={"imgBox"} className={"mainMenuContentBox"}>
                                <div id={"imgContainer"}>
                                    <img src={pic} alt={"conversation"}/>
                                </div>
                            </div>
                            <div className={"mainMenuContentBox"}>
                                <div id={"textContainerWrapper"}>
                                    <div id={"textContainer"}>
                                        <h1>
                                            Learn ASL
                                        </h1>
                                        <hr id={"titleDivider"}>
                                        </hr>
                                        <h3>
                                            through the power
                                            of machine learning.
                                        </h3>
                                    </div>
                                    <div id={"startLearningBtnContainer"}>
                                        <Button href={"#/mode"} id={"startLearningBtn"}>Get Started</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"push"}/>
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default MainMenu