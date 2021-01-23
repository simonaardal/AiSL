import React, {Component} from "react";
import {Button} from '@material-ui/core'
import "./AnswerModal.css"
import {Dialog, DialogTitle, DialogContent} from "@material-ui/core";
import ReactPlayer from 'react-player'


/**
 * @class AnswerModal
 * AnswerModal is the dialog-component that shows the user the prediction from the server along with solution-video and
 * a video of the user executing the sign.
 */
class AnswerModal extends Component{
    constructor(props) {
        super(props);
        /**
         *
         * @type {{skeleton: *, correct: null, answerGiven: *, video: *, url: null, toggleModal: *}}
         */
        this.state = {
            toggleModal : this.props.showAnswerModal,
            answerGiven : this.props.answer,
            url : null,
            correct : null,
            skeleton: this.props.skeleton,
            video: this.props.video
        }
        this.hideModal = this.hideModal.bind(this);
    }

    /**
     * @function hideModal
     * Changing state and thus hiding modal.
     */
    hideModal = () => {
        this.setState({
            toggleModal : false
        })
    }

    /**
     * render renders the component, making it show on the page.
     * @returns {JSX.Element}
     */
    render(){
        if(this.props.skeleton === true){
            return(
                <div id={"answerModalWrapper"}>
                    <Dialog fullWidth={"md"} maxWidth={"md"} id={"modal"} open={this.state.toggleModal} onClose={this.hideModal}>
                        <DialogContent dividers>
                        <h3>You did the sign for {this.props.answer}</h3>
                        <h3>Here is a visualization of how our algorithm tracked your video. </h3>
                        <div id={"answerModalDiv"}>
                            <div id={"skeletonContainer"} className={"gifContainer"}>
                                <h4>Video with tracking skeleton:</h4>
                                <img id="skeletonImg" src={this.state.video} width='400px' height='200px' alt={"video with tracking"}/>
                            </div>
                        </div>
                        <Button id={"closeModalBtn"} variant={"outlined"} onClick={this.hideModal}>Close</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }
        else{
            return(
                <div id={"answerModalWrapper"}>
                    <Dialog fullWidth={"md"} maxWidth={"md"} id={"modal"} open={this.state.toggleModal} onClose={this.hideModal}>
                        {
                            this.props.correct === true ?
                                <DialogTitle id="customized-dialog-title">Correct!</DialogTitle>
                            :
                                <DialogTitle id="customized-dialog-title">That's not the right sign...</DialogTitle>
    
                        }
    
                        <DialogContent dividers>
                        <h3>You did the sign for {this.props.answer}</h3>
                        <h3>Here is a solution video for the sign {this.props.word}.</h3>
                        <div id={"answerModalDiv"}>
                            <div className={"gifContainer"}>
                                <h4>Solution:</h4>
                                <img src={require(`../res/gifs/${(this.props.index+1)}.gif`).default} alt={"solution"}/>
                            </div>
                            <div className={"gifContainer"}>
                                <h4>Your video:</h4>
                                <div id={"playerWrapper"}>
                                    <ReactPlayer id={"reactPlayer"} width={"100%"} height={"100%"} loop={true} playing={true} url={URL.createObjectURL(this.props.video)}/>
                                </div>
                                </div>
                        </div>
                        <Button id={"closeModalBtn"} variant={"outlined"} onClick={this.hideModal}>Close</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        }
    }
}

export default AnswerModal;