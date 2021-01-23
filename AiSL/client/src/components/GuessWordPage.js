import Card from '@material-ui/core/Card';
import React, { Component } from "react";
import "./GuessWordPage.css"
import VideoRecordPlayer from "./VideoRecordPlayer";
import MainMenuButton from "./MainMenuButton";
import 'video.js/dist/video-js.min.css';
import 'videojs-record/dist/css/videojs.record.css';
import Footer from "./Footer";
import LoadingModal from "./LoadingModal";
import AnswerModal from "./AnswerModal";
import "./SharedClasses.css"

/**
 * @class GuessWordPage
 * GuessWordPage is the page where the user is presented a word he/she is going to do the correct sign for.
 * The page contains a recorder which is used to record a video.
 */
class GuessWordPage extends Component{
    constructor(props) {
        super(props);
        /**
         *
         * @type {{showLoadingModal: boolean, answer: string, showAnswerModal: boolean, words: string[],
         * wordToGuess: null, index: number, video: null}}
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
     *
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
        this.setState({
            showAnswerModal : false,
            answer : childData,
        })
        if(childData === this.state.wordToGuess){
            this.setState({
                correctGuess : true
            })
        }
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
            wordToGuess : this.state.words[this.state.index]
        })
    }

    /**
     * Renders the page thus showing it on the screen.
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div className={"recordingPageWrapper"}>
                <div className={"recordingPageContentWrapper"}>
                    <MainMenuButton/>
                    <Card className={"recordingPageBackgroundCard"} >
                        <div className={"recordingPageTitleContainer"}>
                            <h1>Do the sign for: {this.state.wordToGuess}</h1>
                        </div>
                        <div className={"videoRecorderWrapper"}>
                            <VideoRecordPlayer class={"guessWord"} handleLoadingCallback={this.handleLoadingCallback}
                                               handleAnswerCallback={this.handleAnswerCallback}/>
                            {
                                this.state.showLoadingModal ?
                                <LoadingModal showModal={this.state.showLoadingModal}
                                              onClose={this.hideLoadingModal}/> : <div/>
                            }
                            {
                                this.state.showAnswerModal ?
                                <AnswerModal correct={this.state.correctGuess} video={this.state.video} word={this.state.wordToGuess} index={this.state.index} answer={this.state.answer} showAnswerModal={this.state.showAnswerModal} onClose={this.hideAnswerModal}/> : <div/>
                            }
                        </div>
                    </Card>
                    <div className={"push"}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default GuessWordPage;