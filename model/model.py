from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16
import keras
import sys
import random
import numpy as np
import matplotlib.pyplot as plt

'''
usage for prediction: python model.py infer img_filename
es. python model.py infer elephant.jpg

usage for extraction: python model.py extract img_filename layerNumber
es. python model.py extract elephant.jpg 4

temp links
https://stackoverflow.com/questions/46828476/how-to-visualize-output-of-intermediate-layers-of-convolutional-neural-network-i
'''

class Model:
    def __init__(self):
        self.model = VGG16(weights='imagenet')

    def infer(self, img_filename):
        image = self.input_preprocess(img_filename)
        yhat = self.model.predict(image)
        label = decode_predictions(yhat)
        label = label[0][0]
        
        print('%s (%.2f%%)' % (label[1], label[2] * 100))

    def extract(self, img_filename, layerNumber):
        self.printLayers()
        newModel = keras.models.Model(self.model.inputs, self.model.layers[layerNumber].output)
        #print(newModel.summary())

        img = self.input_preprocess(img_filename)
        pred = newModel.predict(img)
        numFilters = pred.shape[3]
        print('The output of the chosen layer is: ', pred.shape, ', so there are ', numFilters, ' images as output of this layer. Choosing some at random...')

        pred = np.squeeze(pred)
        #now pred has shape like (112, 112, 128), which correspond to 128 images 112x112
        pred = np.dsplit(pred, numFilters)
        #now pred is a list of 112x112 images  (or whatever specific number)

        
        
        n = 8
        for i in range(n):
            r = random.randint(0, numFilters - 1)

            #arr_img = pred[:, :, r]       
            arr_img = pred[r]                   #now only select one at random
            arr_img = np.squeeze(arr_img)

            #now make sure all the data in the array is in the range (0, 255)
            maxa = np.amax(arr_img)
            arr_img = arr_img / maxa
            arr_img = arr_img * 255 

            plt.figure()
            plt.imshow(arr_img)
            plt.savefig('./extract_output/' + str(i) + '.png')
            plt.close()
        

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


m = Model()
if sys.argv[1] == 'infer':
    m.infer(sys.argv[2])
elif sys.argv[1] == 'extract':
    m.extract(sys.argv[2], int(sys.argv[3]))
