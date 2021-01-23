const root = "/home/simon/Desktop/AiSL"
const ip = "http://10.53.49.33:3001"
const express = require('express');
const app = express()
const port = 3001
const router = express.Router();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON
const shell = require('shelljs')
const fs = require('fs')


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", ip);
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS, POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, authorization");
    next();
});

app.get('/hei', (req, res) => {
    console.log('Hei der.')
    res.send("hei");
  })

app.post('/video', function (req, res) {
    console.log('Got a POST request for prediction')

    let writeStream = fs.createWriteStream(root + '/output.webm');
    req.pipe(writeStream);


    req.on('end', function () {
        shell.cd(root);
        shell.exec('ffmpeg -i output.webm -crf 0 -r 30 video.mp4');
        shell.exec('./PredictVideo.sh video.mp4');
        try {
          const data = fs.readFileSync('predictions.txt', 'utf-8');
          console.log(data);
          res.send(data);
        }
        catch(err) {
          console.error(err)
        }
    }) 
});

app.post('/skeleton', function (req, res) {
  console.log('Got a POST request for skeleton')

  let writeStream = fs.createWriteStream(root + '/output.webm');
  req.pipe(writeStream);


  req.on('end', function () {
     // shell.cd(root);
      shell.exec('ffmpeg -i output.webm -crf 0 -r 30 video.mp4');
      shell.exec('./PredictVideoSkeleton.sh video.mp4');
      try {
        const data = fs.readFileSync('./predictions.txt', 'utf-8');
        shell.exec('ffmpeg -i result.mp4 ' + data + '.gif');
        const gif = fs.readFileSync("./" + data + '.gif');
        const gifData = gif.toString('base64');
        res.send({
          pred: data,
          video: gifData
        })
        res.on('finish', function() {
          try {
            shell.exec('rm ./' + data + '.gif ./result.mp4');
          } catch(e) {
            console.log("error removing ", filename); 
          }
      });

        console.log('Skeleton returned.');
      }
      catch(err) {
        console.error(err)
      }

      
  }) 
});

app.listen(3001);