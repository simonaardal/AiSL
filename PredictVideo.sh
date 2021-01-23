#!/bin/bash
dir=`pwd`

(trap 'kill 0' SIGINT;  
python3 ${dir}/KeypointsHandler.py &
cd /home/simon/Desktop/Tegnspraak/Tegnspraak/openpose/openpose
echo `pwd`
./build/examples/openpose/openpose.bin --video ${dir}/$1 --write_json ${dir}/Openpose_Realtime --display 2 --render_pose 2 --hand
cd  /home/simon/Desktop/AiSL/Openpose_Realtime
touch done.txt
echo 'DONE'
)