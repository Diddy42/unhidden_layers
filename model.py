from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16
import keras
import sys

'''
usage for prediction: python model.py infer img_filename
usage for extraction: python model.py extract img_filename layerNumber

temp links
https://stackoverflow.com/questions/46828476/how-to-visualize-output-of-intermediate-layers-of-convolutional-neural-network-i
'''

class Model:
    def __init__(self):
        self.model = VGG16(weights='imagenet')

    def infer(self, img_filename):
        image = load_img(img_filename, target_size=(224, 224))
        
        image = img_to_array(image)
        
        image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
        
        image = preprocess_input(image)
       
        yhat = self.model.predict(image)
        
        label = decode_predictions(yhat)
        
        label = label[0][0]
        
        print('%s (%.2f%%)' % (label[1], label[2] * 100))

    def extract(self, img_filename, layerNumber):
        #self.printLayers()
        newModel = keras.models.Model(self.model.inputs, self.model.layers[layerNumber].output)
        #print(newModel.summary())
        newModel.predict()

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


m = Model()
if sys.argv[1] == 'infer':
    m.infer(sys.argv[2])
elif sys.argv[1] == 'extract':
    m.extract(sys.argv[2], int(sys.argv[3]))
