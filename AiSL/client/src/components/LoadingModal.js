import React, {Component} from 'react'
import Loading from "../res/loading2.gif"
import "./LoadingModal.css"
import {Dialog} from "@material-ui/core";
import Button from "@material-ui/core/Button";

/**
 * @class LoadingModal
 * A modal which shows a loading-wheel, indicating to the user he/she has to wait.
 */
class LoadingModal extends Component{
    constructor(props) {
        super(props);
        /**
         *
         * @type {{stop: boolean, toggleModal: *}}
         */
        this.state = {
            toggleModal : this.props.showModal,
            stop : false
        }
        this.hideModal = this.hideModal.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
    }

    /**
     * Hides modal
     */
    hideModal = () => {
        this.setState({
            toggleModal : false
        })
    }

    /**
     * Stops the modal from loading
     */
    stopLoading = () => {
        this.setState({
            stop : true
        })
    }

    /**
     * Sets timer.
     * @returns {function(): void}
     */
    componentDidMount() {
        const timer = setTimeout(() => {
            this.stopLoading();
        }, 20000);
        return () => clearTimeout(timer);
    }

    /**
     * Rendering the component, showing it on the screen.
     * @returns {JSX.Element}
     */
    render(){
        return(
            <div>
                <Dialog disableBackdropClick={true} open={this.state.toggleModal} onClose={this.hideModal}>
                    <div id={"loadingModalWrapper"}>
                        {
                            this.state.stop ?
                                <div id={"modalFeedbackDiv"}>
                                    <h2>The server is not responding... </h2>
                                    <Button id={"exitLoadingModalBtn"} onClick={() => {this.hideModal()}} varant={"outlined"}>Close </Button>
                                </div>

                                :

                                <img src={Loading} alt={"loading animation"}/>
                        }
                    </div>
                </Dialog>
            </div>
        );
    }
}
export default LoadingModal;