#!/bin/bash

cd "./Original"

for file in *.mp4
do
    ffmpeg -i ${file} -vf hflip -c:a copy ../Mirrored/${file}  
done



