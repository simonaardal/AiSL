import React, {Component} from "react";
import Card from "@material-ui/core/Card";
import VideoRecordPlayer from "./VideoRecordPlayer";
import MainMenuButton from "./MainMenuButton";
import Footer from "./Footer";
import "./GuessImagePage.css"
import LoadingModal from "./LoadingModal";
import AnswerModal from "./AnswerModal";
import "./MainMenuButton.css"
import "./SharedClasses.css"

/**
 * @class GuessImagePage
 * GuessImagePage is the page where the user gets presented an image, and is supposed to do the correct sign
 * corresponding to that image.
 */
class GuessImagePage extends Component{
    constructor(props){
        super(props);
        /**
         *
         * @type {{showLoadingModal: boolean,
         * answer: string,
         * showAnswerModal: boolean,
         * words: string[],
         * wordToGuess: null,
         * index: number,
         * video: null}}
         */
        this.state = {
            words : ["Again", "Bathroom", "Boy", "But", "Deaf", "Drink", "Eat", "Family", "Father",
                "Food", "Friend", "Girl", "Home", "Like", "Man", "My", "Name", "No", "Play", "Please",
                "School", "Sorry", "Thank You", "Tired", "Understand", "Woman", "Work", "Write",
                "Yes"],
            index : Math.floor((Math.random() * 28) + 1),
            answer : "",
            showAnswerModal : false,
            showLoadingModal: false,
            wordToGuess : null,
            video : null,
            correctGuess : false
        }
        this.showAnswerModal = this.showAnswerModal.bind(this);
        this.showLoadingModal = this.showLoadingModal.bind(this);
    }

    /**
     * @function
     * Sets state in order to show the answer-modal and at the same time hide the loading-modal.
     *
     */
    showAnswerModal = () => {
        this.setState({
            showAnswerModal : true,
        })
        this.hideLoadingModal();
    }

    /**
     * @function
     * Sets state in order to show the loading-modal.
     * @returns void
     */
    showLoadingModal = () => {
        this.setState({
            showLoadingModal : true
        });
    }

    /**
     * @function
     * Sets state in order to hide the loading modal.
     *
     */
    hideLoadingModal = () => {
        this.setState({
            showLoadingModal : false
        })
    }

    /**
     * @function
     * Sets state in order to hide the answer modal.
     *
     */
    hideAnswerModal = () => {
        this.setState({
            showAnswerModal : false
        })
    }

    /**
     * @function
     * Handles the callback from the server. Based on the answer given, it proceeds to change necessary state.
     * @param {string} childData Data received from the server.
     */
    handleAnswerCallback = (childData) => {
        console.log("Child data: " + childData);
        this.setState({
            showAnswerModal : false,
            answer : childData,
        })
        if(childData === this.state.wordToGuess){
            this.setState({
                correctGuess : true
            }, function(){
              //  console.log("Correct guess: " + this.state.correctGuess);
            })
        }
        console.log("Correct guess: " + this.state.correctGuess);
        this.showAnswerModal();
    }

    /**
     * @function
     * When the user sends the recorded video to the server, this function receives the video and puts it in state.
     * It then proceeds to show the loading-modal.
     * @param video The video recorded by the user.
     */
    handleLoadingCallback = (video) => {
        this.setState({
            video : video,
            correctGuess : false
        })
        this.showLoadingModal();
    }

    /**
     * Generates index (and thus which word to guess).
     */
    componentDidMount() {
        this.setState({
            wordToGuess : this.state.words[(this.state.index)]
        }, function () {
            console.log(this.state.wordToGuess);
        });
    }

    /**
     * Renders the page, showing it on the page.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={"recordingPageWrapper"}>
                <div className={"recordingPageContentWrapper"}>
                    <MainMenuButton/>
                    <Card id={"guessImageBackgroundCard"} >
                        <div>
                            <div id={"titleContainer"}>
                                <h1>Guess the image!</h1>
                            </div>
                            <div  id={"contentContainer"}>
                                <div>
                                    <div id={"imageToGuessContainer"}>
                                        <img src={require(`../res/imagesToGuess/${this.state.index+1}.jpg`).default}
                                             alt={"image to guess"}/>
                                    </div>
                                </div>
                                <div>
                                    <div id={"recordingContainer"}>
                                        <VideoRecordPlayer class={"guessImage"} skeleton={false} handleLoadingCallback={this.handleLoadingCallback}
                                                           handleAnswerCallback={this.handleAnswerCallback}
                                                           width={"630px"} height={"400px"}/>
                                        {
                                            this.state.showLoadingModal ?
                                                <LoadingModal showModal={this.state.showLoadingModal}
                                                              onClose={this.hideLoadingModal}/> : <div/>
                                        }
                                        {
                                            this.state.showAnswerModal ?
                                                <AnswerModal video={this.state.video} word={this.state.wordToGuess}
                                                             index={this.state.index} answer={this.state.answer}
                                                             showAnswerModal={this.state.showAnswerModal} correct = {this.state.correctGuess}
                                                             onClose={this.hideAnswerModal}/> : <div/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <div id={"push"}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default GuessImagePage;

