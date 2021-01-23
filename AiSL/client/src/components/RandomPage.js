import React,{Component} from 'react';
import VideoRecordPlayer from "./VideoRecordPlayer";
import MainMenuButton from "./MainMenuButton";
import "./RandomPage.css"
import "./GuessWordPage.css"
import {Card} from "@material-ui/core";
import LoadingModal from "./LoadingModal";
import AnswerModal from "./AnswerModal";
import Footer from "./Footer";
import "./SharedClasses.css";

/**
 * @class RandomPage
 * RandomPage is the page where the user can do whatever sign he/she wants, and be presented with the corresponding
 * ASL-sign for that word.The page contains a recorder which is used to record a video.
 */
class RandomPage extends Component{
    constructor(props) {
        super(props);
        /**
         *
         * @type {{skeleton: boolean,
         * showLoadingModal: boolean,
         * answer: string,
         * showAnswerModal: boolean,
         * index: number,
         * video: null}}
         */
        this.state = {
            index : Math.floor((Math.random() * 28) + 1),
            answer : "",
            skeleton: true,
            showAnswerModal : false,
            showLoadingModal: false,
            video : null
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
        }, function () {
            console.log(this.state.showLoadingModal);
        })
        this.hideAnswerModal();
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
     * Handles the callback from the server. Based on the answer given, it proceeds to change necessary state.
     * @param childData Contains the data received from the server.
     */
    handleAnswerCallback = (childData) => {
        console.log("returned");
        console.log(childData.pred);
        this.setState({
            answer: childData.pred,
            video: "data:image/;base64," + childData.video
        })
        this.showAnswerModal();
    }

    /**
     * @function
     * When the user sends the recorded video to the server, this function receives the video and puts it in state.
     * It then proceeds to show the loading-modal.
     * @param video The video recorded by the user.
     */
    handleLoadingCallback = (video) => {
        console.log(video);
        this.setState({
            video : video
        })
        this.showLoadingModal();

    }

    /**
     * Renders the page, and thus showing it on the screen.
     * @returns {JSX.Element}
     */
    render(){
        return(
            <div className={"recordingPageWrapper"}>
                <div className={"recordingPageContentWrapper"}>
                    <MainMenuButton/>
                    <Card className={"recordingPageBackgroundCard"}>
                        <div className={"recordingPageTitleContainer"}>
                            <h1>Do whatever sign you'd like!</h1>
                        </div>
                        <div className={"videoRecorderWrapper"}>
                            <VideoRecordPlayer id={"recorder"} handleLoadingCallback={this.handleLoadingCallback}
                                               handleAnswerCallback={this.handleAnswerCallback} skeleton={true}/>
                            {
                                this.state.showLoadingModal ?
                                    <LoadingModal showModal={this.state.showLoadingModal} onClose={this.hideLoadingModal}/> : <div/>
                            }
                            {
                                this.state.showAnswerModal ?
                                    <AnswerModal video={this.state.video} word={this.state.wordToGuess}
                                                 index={this.state.index} answer={this.state.answer}
                                                 skeleton={true} showAnswerModal={this.state.showAnswerModal}
                                                 onClose={this.hideAnswerModal}/> : <div/>
                            }
                        </div>
                    </Card>
                    <div id={"push"}/>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default RandomPage;