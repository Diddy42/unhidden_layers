from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16
import keras
import tensorflow as tf
import sys
import random
import numpy as np
import matplotlib.pyplot as plt
import time
from os import listdir
from os.path import isfile, join
import os
import json
import base64
from io import BytesIO
from PIL import Image

class Model:
    def __init__(self):
        #self.model = keras.applications.MobileNetV2(weights='imagenet')
        print('loading model...')
        self.model = tf.keras.applications.MobileNetV2(weights='imagenet')
        #self.printLayers()

        self.cnt = 0

    def infer(self, img_filename):
        image = self.input_preprocess(img_filename)
        yhat = self.model.predict(image)
        label = decode_predictions(yhat)
        label = label[0][0]
        
        print('%s (%.2f%%)' % (label[1], label[2] * 100))
        return '%s (%.2f%%)' % (label[1], label[2] * 100)

    def extract(self, img_filename, unique_id):
        result_dict = {}

        #self.printLayers()
        #significant_layers = [1, 4, 12, 19, 30, 44, 57, 119, 152]
        significant_layers = [1, 12, 30, 57, 119, 152]

        for sl in significant_layers:
            print('now doing layer ' + str(sl))
            newModel = keras.models.Model(self.model.inputs, self.model.layers[sl].output)

            img = self.input_preprocess(img_filename)
            pred = newModel.predict(img)
            numFilters = pred.shape[3]
            print('The output of the chosen layer is: ', pred.shape, ', so there are ', numFilters, ' images as output of this layer. Choosing some at random...')

            pred = np.squeeze(pred)
            #now pred has shape like (112, 112, 128), which correspond to 128 images 112x112
            pred = np.dsplit(pred, numFilters)
            #now pred is a list of 112x112 images  (or whatever specific number)

            result_dict['layer_' + str(sl)] = []
            
            n = 3
            for i in range(n):
                print('now doing image ' + str(i))
                r = random.randint(0, numFilters - 1)

                #arr_img = pred[:, :, r]       
                arr_img = pred[r]                   #now only select one at random
                arr_img = np.squeeze(arr_img)

                #now make sure all the data in the array is in the range (0, 255)
                maxa = np.amax(arr_img)
                if maxa != 0:
                    arr_img = arr_img / maxa
                    arr_img = arr_img * 255 

                
                pil_img = Image.fromarray(arr_img)
                pil_img = pil_img.convert("L")
                pil_img = pil_img.resize((224, 224))
                buff = BytesIO()
                pil_img.save(buff, format="PNG")
                b64_image_string = base64.b64encode(buff.getvalue()).decode("utf-8")

                result_dict['layer_' + str(sl)].append(b64_image_string)

                
                
                '''
                plt.figure()
                plt.imshow(arr_img)
                plt.savefig('./extract_output/' + str(unique_id)+'_' + 'l'+str(sl)+'_' + str(i) + '.png')
                plt.close()
                '''

        return result_dict
        

    def printLayers(self):
        i = 0
        for l in self.model.layers:
            print(str(i) + ': ', l.name, l.output_shape)
            i = i + 1

    def input_preprocess(self, img_filename):
        image = load_img(img_filename, target_size=(224, 224))
        image = img_to_array(image)
        image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
        image = preprocess_input(image)

        return image

    def get_middle_output_image(self, filename):
        #filename = '1.jpg'

        dict_obj = self.extract(filename, 1)

        return dict_obj

    def get_a_string(self):
        print('test logging mobilenet.py')

        dict_obj = {}
        dict_obj['string'] = 'a string!'
        dict_obj['number'] = self.cnt
        dict_obj['result'] = 'success'

        time.sleep(5)

        self.cnt = self.cnt + 1

        return json.dumps(dict_obj)

def new_image(mypath):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    if len(onlyfiles) == 0:
        return False
    else:
        return onlyfiles[0]
        
def clear_unprocessed(mypath, finished_file):
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    for f in onlyfiles:
        print('removing ' + unprocessed_folder + '/' + f)
        os.remove(unprocessed_folder + '/' + f)

    f = open(finished_file, 'w')
    f.close()

def process_img(file, m, unique_id, output_folder, finished_file):
    inference = m.infer(file)
    
    f = open(output_folder + '/' + unique_id + '.txt', 'w')
    f.write(inference)
    f.close()

    m.extract(file, unique_id)

    os.remove(file)

    f = open(finished_file, 'a')
    f.write(str(unique_id) + '\n')
    f.close()


'''
m = Model()
unprocessed_folder = 'unprocessed'
output_folder = 'extract_output'
finished_file = 'finished.txt'

clear_unprocessed(unprocessed_folder, finished_file)

while True:
    f = new_image(unprocessed_folder)
    if f != False:
        time.sleep(5)
        print('new file: ' + f)
        unique_id = f.split('.')[0]
        process_img(unprocessed_folder + '/' + f, m, unique_id, output_folder, finished_file)
    
    time.sleep(0.1)
'''

