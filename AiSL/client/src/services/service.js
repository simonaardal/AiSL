import axios from "axios";
import * as https from "https";

class VideoService{



    sendVideo(blob){

        return axios.post("http://10.53.49.33:3001/video", blob, ).then(response => response.data);
    }

    siHei(){
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        return axios.get("http://192.168.2.203:3001/hei", { httpsAgent: agent }).then(response => response.data);
    }

    sendVideoSkeleton(blob){
        return axios.post("http://10.53.49.33:3001/skeleton", blob).then(response => response.data);
    }
}

export let videoService = new VideoService();