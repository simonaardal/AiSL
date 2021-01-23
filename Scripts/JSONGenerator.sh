#!/bin/bash

currentDir=`pwd`
projectPath="/AiSL/Scripts"
base="${currentDir%$projectPath}"

cd "$base/AiSL/Videos/Videos_new/Videos_new_training"
#kode for å få navnet på ordet fra "file" 

for dir in */
    do
    #TRAINING VIDEOS
    pathToDir="$base/AiSL/Videos/Videos_new/Videos_new_training/$dir"
    cd "$base/AiSL/CNN_source/Keypoints/Keypoints_training"
    mkdir $dir
    dest="$base/AiSL/CNN_source/Keypoints/Keypoints_training/$dir"

    for file in $pathToDir/*.mp4
    do
        cd /home/simon/Desktop/Tegnspraak/Tegnspraak/openpose/openpose
        ./build/examples/openpose/openpose.bin --video $file --write_json $dest --display 0 --render_pose 0 --hand
        echo "kjører openpose for treningsvideoer"
    done

    cd "$base/AiSL/Videos/Videos_new/Videos_new_training"
   


    #TESTVIDEOS
    pathToDir="$base/AiSL/Videos/Videos_new/Videos_new_test/$dir"
    cd "$base/AiSL/CNN_source/Keypoints/Keypoints_test"
    mkdir $dir
    dest="$base/AiSL/CNN_source/Keypoints/Keypoints_test/$dir"
    
    for file in $pathToDir/*.mp4
    do
        echo "kjører openpose for testvideoer"
        cd /home/simon/Desktop/Tegnspraak/Tegnspraak/openpose/openpose
        ./build/examples/openpose/openpose.bin --video $file --write_json $dest --display 0 --render_pose 0 --hand
    done

    cd "$base/AiSL/Videos/Videos_new/Videos_new_test"
   #mv $pathToDir $base/AiSL/Data/Videos/Videos_test

    
done