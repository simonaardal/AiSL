import 'video.js/dist/video-js.min.css';
import videojs from 'video.js'
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record.js';
import 'videojs-record/dist/css/videojs.record.css';
import React from "react";
import "./VideoRecordPlayer.css"
import Button from "@material-ui/core/Button";
import {videoService} from "../services/service";


/**
 * @class VideoRecordPlayer
 * VideoRecordPlayer is the player-component on the three recording-screens. It handles the video-recording and sending
 * the recorded video to the server.
 */
class VideoRecordPlayer extends React.Component {

    constructor(props) {
        super(props);
        /**
         *
         * @type {{skeleton: *, width: *, disabled: boolean, video: null, height: *}}
         */
        this.state = {
            video: null,
            skeleton: this.props.skeleton,
            height: this.props.height,
            width: this.props.width,
            disabled : true
        }
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.setEnabled = this.setEnabled.bind(this);
        this.setDisabled = this.setDisabled.bind(this);
    }

    /**
     * @function setEnabled
     * Sets the "send"-button as enabled.
     */
    setEnabled(){
        this.setState({
            disabled : false
        })
    }

    /**
     * @function setDisabled
     * sets the "send"-button to disabled.
     */
    setDisabled(){
        this.setState({
            disabled: true
        })
    }

    startRecording(){
        this.player.record().start();
    }

    stopRecording(){
        this.player.record().stopDevice();

    }

    /**
     * @function componentDidMount
     * Initializes the recorder with appropiate settings.
     */
    componentDidMount() {

        let options = {
            // video.js options
            controls: true,
            bigPlayButton: false,
            loop: false,
            fluid: true,
            muted : true,
            plugins: {
                // videojs-record plugin options
                record: {
                    image: false,
                    audio: false,
                    video : {
                        width: 1280,
                        height: 720
                    },
                    debug: true
                }
            }
        };

        // instantiate Video.js
        this.player = videojs("myVideo", options, () => {
            // print version information at startup
            let msg = 'Using video.js ' + videojs.VERSION +
                ' with videojs-record ' + videojs.getPluginVersion('record') +
                ' and recordrtc ' + RecordRTC.version;
            videojs.log(msg);
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.error(error);
        });

        // device is ready
        this.player.on('deviceReady', () => {
            console.log('device is ready!');
        });


        // user clicked the record button and started recording
        this.player.on('startRecord', () => {
            console.log('started recording!');
            this.setDisabled();
        });

        // user completed recording and stream is available
        this.player.on('finishRecord', () => {
            // the blob object contains the recorded data that
            // can be downloaded by the user, stored on server etc.
            console.log('finished recording: ', this.player.recordedData);
            this.setState((state, props) => {
                state.video = this.player.recordedData;

            }, function(){
                this.setEnabled();
            })
            console.log("Knappen er disabled: " + this.state.disabled);
            console.log(this.state.video);
        });
    }

    /**
     * @function componentWillUnmount
     * Destroyts the player upon unmounting.
     */
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    /**
     * @function render
     * Renders the component, showing it on screen.
     * @returns {JSX.Element}
     */
    render() {
        if(this.props.skeleton){
            return (
                <div>
                    {
                        this.props.class !== "guessImage" ?
                            <div>
                            <div id={"videoWrapper"}>
                                <video id="myVideo" className="video-js vjs-default-skin vjs-using-native-controls"
                                       preload="auto" ref={node => this.videoNode = node} playsInline/>
                                </div>
                                <div id={"btnContainer"}>
                                <Button disabled={this.state.disabled} id="sendBtn" variant="outlined" onClick={(e) => this.sendVideoSkeleton(e)}>Send</Button>
                            </div>
                            </div>:
    
                        <div id={"videoImageWrapper"}>
                            <div>
                            <video id="myVideo" className="video-js vjs-default-skin" controls
                            preload="auto" ref={node => this.videoNode = node} playsInline/>
                            </div>
                            <div id={"btnContainer"}>
                                <Button disabled={this.state.disabled} id="sendBtn" variant="outlined" onClick={(e) => this.sendVideoSkeleton(e)}>Send</Button>
                            </div>
                        </div>
    
                    }
    
                </div>
            )
        }
        else{
            return (
                <div>
                    {
                        this.props.class !== "guessImage" ?
                            <div>
                            <div id={"videoWrapper"}>
                                <video id="myVideo" className="video-js vjs-default-skin" controls
                                       preload="auto" ref={node => this.videoNode = node} playsInline/>
                                </div>
                                <div id={"btnContainer"}>
                                <Button disabled={this.state.disabled} id="sendBtn" variant="outlined" onClick={(e) => this.sendVideo(e)}>Send</Button>
                            </div>
                            </div>:
    
                        <div id={"videoImageWrapper"}>
                            <div>
                            <video id="myVideo" className="video-js vjs-default-skin" controls
                            preload="auto" ref={node => this.videoNode = node} playsInline/>
                            </div>
                            <div id={"btnContainer"}>
                            <Button disabled={this.state.disabled} id="sendBtn" variant="outlined" onClick={(e) => this.sendVideo(e)}>Send</Button>
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }

    sendVideo(e){
        e.preventDefault();
        this.props.handleLoadingCallback(this.state.video);
       // videoService.siHei().then(data => this.props.handleAnswerCallback(data)).catch(error => console.error(error.message));
        videoService.sendVideo(this.state.video).then(data => this.props.handleAnswerCallback(data)).catch(error => console.error(error.message))
    }

    sendVideoSkeleton(e){
        e.preventDefault();
        this.props.handleLoadingCallback(this.state.video);
        videoService.sendVideoSkeleton(this.state.video).then(data => this.props.handleAnswerCallback(data)).catch(error => console.error(error.message))
    }
}



export default VideoRecordPlayer;
