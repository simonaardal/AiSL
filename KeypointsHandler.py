#!/usr/bin/python3
import pandas as pd
import math as math
import traceback
import numpy as np
import tensorflow as tf
import time
import glob
import os
import sys
import json
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


# Bug fix
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    try:
        # Currently, memory growth needs to be the same across GPUs
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        logical_gpus = tf.config.experimental.list_logical_devices('GPU')
        print(len(gpus), "Physical GPUs,", len(logical_gpus), "Logical GPUs")
    except RuntimeError as e:
        # Memory growth must be set before GPUs have been initialized
        print(e)


def NumToWord(num):
    words = ["Again", "Bathroom", "Boy", "But", "Deaf", "Drink", "Eat", "Family", "Father",
             "Food", "Friend", "Girl", "Home", "Like", "Man", "My", "Name", "No", "Play", "Please",
             "School", "Sorry", "ThankYou", "Tired", "Understand", "Woman", "Work", "Write",
             "Yes"]
    return words[num]


def WordToNum(wordIn):
    words = ["Again", "Bathroom", "Boy", "But", "Deaf", "Drink", "Eat", "Family", "Father",
             "Food", "Friend", "Girl", "Home", "Like", "Man", "My", "Name", "No", "Play", "Please",
             "School", "Sorry", "ThankYou", "Tired", "Understand", "Woman", "Work", "Write",
             "Yes"]
    teller = 0
    for word in words:
        if word == wordIn:
            return teller
        else:
            teller = teller + 1


def ArrayChunkMaker(dfArray, size):
    count = 0
    KeypointsArrayOpen = []
    tempArray = []

    for ar in dfArray.iloc:

        tempArray.append(ar)
        count = count + 1

        if(count == size):

            KeypointsArrayOpen.append(tempArray)
            count = 0
            tempArray = []

    return KeypointsArrayOpen


run = True
demo_run = True

predictions = np.zeros(29)

modelO = tf.keras.models.load_model('CNN_source/SavedModel/model.h5')
antPredictions = 0
json_array = []

teller = 0

while (run == True):
    curr_files = len(os.listdir('Openpose_Realtime'))
    #print("Current: %s" % curr_files)
    #print("Previous: %s" % prev_files)
            
    try:

        list_of_files = glob.glob('Openpose_Realtime/*')

        numberOfFiles = len(list_of_files)

        if(len(list_of_files) > 0):
            latest_file = max(list_of_files, key=os.path.getctime)
            if(latest_file.endswith('.txt')):
                print("Found txt file")
                run = False
            with open(latest_file) as json_file:

                json_text = json.load(json_file)

                temp_array = []

                if (len(json_text['people']) < 1):
                    continue
                if(json_text['people'][0]['hand_right_keypoints_2d'][0] == 0 and json_text['people'][0]['hand_left_keypoints_2d'][0] == 0):
                    continue

                x_right = []
                y_right = []
                x_left = []
                y_left = []

                #
                # Z-SCORE
                #


                for i in range(21):
                    index_corr = i*3

                    x_pos_right = json_text['people'][0]['hand_right_keypoints_2d'][0 + index_corr]
                    y_pos_right = json_text['people'][0]['hand_right_keypoints_2d'][1 + index_corr]

                    x_right.append(float(x_pos_right))
                    y_right.append(float(y_pos_right))

                    x_pos_left = json_text['people'][0]['hand_left_keypoints_2d'][0 + index_corr]
                    y_pos_left = json_text['people'][0]['hand_left_keypoints_2d'][1 + index_corr]

                    y_left.append(float(y_pos_left))
                    x_left.append(float(x_pos_left))

                xMean_right = np.mean(x_right)
                yMean_right = np.mean(y_right)
                xstd_right = np.std(x_right)
                ystd_right = np.std(y_right)

                xMean_left = np.mean(x_left)
                yMean_left = np.mean(y_left)
                xstd_left = np.std(x_left)
                ystd_left = np.std(y_left)

                k = 0
                for k in range(0, 21, 1):
                    if(math.isnan(((x_right[k] - xMean_right)/xstd_right))):
                        temp_array.append(0)
                    else:
                        temp_array.append(
                            ((x_right[k] - xMean_right)/xstd_right))

                    if(math.isnan(((y_right[k] - yMean_right)/ystd_right))):
                        temp_array.append(0)
                    else:
                        temp_array.append(
                            ((y_right[k] - yMean_right)/ystd_right))

                    if(math.isnan(((x_left[k] - xMean_left)/xstd_left))):
                        temp_array.append(0)
                    else:
                        temp_array.append(((x_left[k] - xMean_left)/xstd_left))

                    if(math.isnan(((y_left[k] - yMean_left)/ystd_left))):
                        temp_array.append(0)
                    else:
                        temp_array.append(((y_left[k] - yMean_left)/ystd_left))

                json_array.append(temp_array)
                teller += 1
                
                if(teller == 10):
                    dfOpen = pd.DataFrame(json_array, columns=['r_keypoint_0_x', 'r_keypoint_0_y', 'l_keypoint_0_x',
                                                               'l_keypoint_0_y', 'r_keypoint_1_x', 'r_keypoint_1_y', 'l_keypoint_1_x', 'l_keypoint_1_y', 'r_keypoint_2_x',
                                                               'r_keypoint_2_y', 'l_keypoint_2_x', 'l_keypoint_2_y', 'r_keypoint_3_x', 'r_keypoint_3_y', 'l_keypoint_3_x',
                                                               'l_keypoint_3_y', 'r_keypoint_4_x', 'r_keypoint_4_y', 'l_keypoint_4_x', 'l_keypoint_4_y', 'r_keypoint_5_x',
                                                               'r_keypoint_5_y', 'l_keypoint_5_x', 'l_keypoint_5_y', 'r_keypoint_6_x', 'r_keypoint_6_y', 'l_keypoint_6_x',
                                                               'l_keypoint_6_y', 'r_keypoint_7_x', 'r_keypoint_7_y', 'l_keypoint_7_x', 'l_keypoint_7_y', 'r_keypoint_8_x',
                                                               'r_keypoint_8_y', 'l_keypoint_8_x', 'l_keypoint_8_y', 'r_keypoint_9_x', 'r_keypoint_9_y', 'l_keypoint_9_x',
                                                               'l_keypoint_9_y', 'r_keypoint_10_x', 'r_keypoint_10_y', 'l_keypoint_10_x', 'l_keypoint_10_y', 'r_keypoint_11_x',
                                                               'r_keypoint_11_y', 'l_keypoint_11_x', 'l_keypoint_11_y', 'r_keypoint_12_x', 'r_keypoint_12_y', 'l_keypoint_12_x',
                                                               'l_keypoint_12_y', 'r_keypoint_13_x', 'r_keypoint_13_y', 'l_keypoint_13_x', 'l_keypoint_13_y', 'r_keypoint_14_x',
                                                               'r_keypoint_14_y', 'l_keypoint_14_x', 'l_keypoint_14_y', 'r_keypoint_15_x', 'r_keypoint_15_y', 'l_keypoint_15_x',
                                                               'l_keypoint_15_y', 'r_keypoint_16_x', 'r_keypoint_16_y', 'l_keypoint_16_x', 'l_keypoint_16_y', 'r_keypoint_17_x',
                                                               'r_keypoint_17_y', 'l_keypoint_17_x', 'l_keypoint_17_y', 'r_keypoint_18_x', 'r_keypoint_18_y', 'l_keypoint_18_x',
                                                               'l_keypoint_18_y', 'r_keypoint_19_x', 'r_keypoint_19_y', 'l_keypoint_19_x', 'l_keypoint_19_y', 'r_keypoint_20_x',
                                                               'r_keypoint_20_y', 'l_keypoint_20_x', 'l_keypoint_20_y'])
                
                    keypoints = ArrayChunkMaker(dfOpen, 10)
                    result = np.argmax(modelO.predict(np.array(keypoints)))

                    #print("Result: %s" % result)
                    #print('Predict: ' + NumToWord(result))
                    predictions[result] += 1
                    print(np.array(predictions))
                    teller = 0
                    json_array = []
                    antPredictions = antPredictions + 1
                    #print("Tipper på ordet " + NumToWord(np.argmax(np.array(predictions))))
    
    except BaseException as e:
        print(e)
    
    
    if run == False:
        print("Number of predictions: %d" %antPredictions)
        print("Writing prediction: %s" % NumToWord(np.argmax(np.array(predictions))))
        file = open("predictions.txt", "w")
        file.write("%s" % NumToWord(np.argmax(np.array(predictions))))
        file.close()

        os.remove("video.mp4")
        os.remove("output.webm")

        for f in list_of_files:
            os.remove(f)    
            

print("Prediction finished.")
