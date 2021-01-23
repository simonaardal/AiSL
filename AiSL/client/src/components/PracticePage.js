import React,{Component} from 'react';
import { Card } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MainMenuButton from "./MainMenuButton.js"

import "./PracticePage.css";

let words = ["Again", "Bathroom", "Boy", "But", "Deaf", "Drink", "Eat", "Family", "Father",
    "Food", "Friend", "Girl", "Home", "Like", "Man", "My", "Name", "No", "Play", "Please",
    "School", "Sorry", "Thank You", "Tired", "Understand", "Woman", "Work", "Write",
    "Yes"];

/**
 * class @PracticePage
 * The PracticePage is the page the user can use to practice the signs in the AiSL system. It contains all the
 * available signs AiSL are able to recognize.
 */
class PracticePage extends Component{
    constructor(props) {
        super(props);
        /**
         *
         * @type {{flashcards: boolean, randomWord: number}}
         */
        this.state = {
            flashcards: false,
            randomWord: 1
        };
        this.handleClick = this.handleClick.bind(this);
        this.randomize = this.randomize.bind(this);
    }

    /**
     * @function handleClick
     * Clickhandler for when the user clicks to change flashcard.
     * @param flashcardChange
     */
    handleClick(flashcardChange) {
        this.setState(state => ({
            flashcards: flashcardChange
        }));
    }

    /**
     * @function randomize
     * Function to generate new random word.
     */
    randomize() {
        let max = 29;
        let min = 1;
        let newWord = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(newWord);
        this.setState(state => ({
            randomWord: newWord
        }));
    }

    /**
     * @function render
     * Renders the page, showing it on screen.
     * @returns {JSX.Element}
     */
    render() {
        let cards = [];

        for (let i = 1; i < 30; i++){
            console.log(i);
            cards.push(
                <Card className={"GIFCard"}>
                    {words[i-1]}
                    <img src={require(`../res/gifs/${i}.gif`).default}/>
                </Card>
            );
        }
        if (this.state.flashcards) {
            return (
                <div className={"practicepage"}>
                    <MainMenuButton/>
                    <div className={"titleCard"}>
                        Below are all available words on our service.
                    <br />
                    Practice these in the form of flashcards, or viewing them listed below.
                    </div>
                    <div className={"switchBtn"}>
                        Select Mode:
                    <br />
                        <Button className={"flashcardBtn"} variant={"outlined"} onClick={(event) => this.handleClick(true)}>Flashcards</Button>
                        <Button className={"listAllBtn"} variant={"outlined"} onClick={(event) => this.handleClick(false)}> List all</Button>
                    </div>
                    <br />
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img className={"flashimg"} src={require(`../res/gifs/${this.state.randomWord}.gif`).default} alt="Avatar" />
                            </div>
                            <div className="flip-card-back">
                                <h1>{words[this.state.randomWord-1]}</h1>

                            </div>
                        </div>
                    </div>
                    <Button id={"randomBtn"} onClick={this.randomize}> New Word </Button>
                </div>
            )

        }
        else {
            return (
                <div className={"practicepage"}>
                    <MainMenuButton/>
                    <div className={"titleCard"}>
                        Below are all available words on our service.
                    <br />
                    Practice these in the form of flashcards, or viewing them listed below.
                </div>
                    <div className={"switchBtn"}>
                        Select Mode:
                    <br />
                        <Button className={"flashcardBtn"} variant={"outlined"} onClick={(event) => this.handleClick(true)}>Flashcards</Button>
                        <Button className={"listAllBtn"} variant={"outlined"} onClick={(event) => this.handleClick(false)}> List all</Button>
                    </div>
                    <br />
                    <div className={"practicewrapper"}>
                        {cards}
                    </div>
                </div>

            )
        }
    }
}
export default PracticePage;