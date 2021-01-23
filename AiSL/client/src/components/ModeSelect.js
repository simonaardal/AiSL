import React, { Component } from "react";
import "./ModeSelect.css"
import "./SharedClasses.css"
import Button from "@material-ui/core/Button";
import Footer from "./Footer";

/**
 * @class ModeSelect
 * ModeSelect presents the different learning-modes for the user. The user is presented four options: to do a sign
 * corresponding to a random word, to do a sign corresponding to an image, do a random sign of his/hers choosing,
 * or practice.
 */
class ModeSelect extends Component{
    /**
     *
     * @returns {JSX.Element}
     * Renders the component, thus showing the page on screen.
     */
    render(){
        return(
            <div id={"modeSelectWrapper"}>
                <div id={"modeSelectContent"}>
                    <div id={"modeSelectGridContainer"}>
                            <div id={"chooseGrid"}>
                                <div id={"chooseTextContainer"}>
                                    <h2>Choose your mode.</h2>
                                </div>
                            </div>
                            <div id={"itemsContainer"} >
                                <div className={"modeSelectGridItem"}>
                                    <h1>Practice your signs.</h1>
                                    <p>In this mode,  you will be presented with words accompanied by their respective ASL signs.
                                        It’s
                                        your job to practice them and expand your knowledge. </p>
                                    <Button href={"#/practice"} variant={"outlined"} id={"chooseModeBtn"}>Practice ASL</Button>
                                </div>
                                <div className={"modeSelectGridItem"}>
                                    <h1>Do signs for an image.</h1>
                                    <p>In this mode,  you will be presented with an image,
                                        and it’s
                                        your job to do the correct sign corresponding to that image. </p>
                                    <Button href={"#/recordImage"} variant={"outlined"} id={"chooseModeBtn"}>Guess images</Button>
                                </div>
                                <div className={"modeSelectGridItem"}>
                                    <h1>Do signs for words.</h1>
                                    <p>In this mode,  you will be presented with a word, and it’s
                                        your job to do the correct sign corresponding to that word.  </p>
                                    <Button href={"#/record"} variant={"outlined"} id={"chooseModeBtn"}>Guess words</Button>
                                </div>
                                <div id={"lastItem"} className={"modeSelectGridItem"}>
                                    <h1>Test our algorithm.</h1>
                                    <p>In this mode, you’re free to do whatever sign you'd like. See how our algorithm tracks your movements and makes a prediction.  </p>
                                    <Button href={"#/random"} variant={"outlined"} id={"chooseModeBtn"}>Start testing</Button>
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
export default ModeSelect