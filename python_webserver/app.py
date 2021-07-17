'''
https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/

https://docs.docker.com/language/python/build-images/
'''

#you can see it on http://localhost:5000

'''
in /unhidden_layers/python_webserver/react_app/react_ul/build after build:

unhidden_layers_1  | asset-manifest.json
unhidden_layers_1  | favicon.ico
unhidden_layers_1  | index.html
unhidden_layers_1  | logo192.png
unhidden_layers_1  | logo512.png
unhidden_layers_1  | manifest.json
unhidden_layers_1  | robots.txt
unhidden_layers_1  | static

'''

from flask import Flask, render_template, request
from os import environ
from mobilenet import Model
from utils import print_current_RAM_usage, send_text, get_memory_used
import time
import threading
import json
from flask_cors import CORS
from os import listdir
from os.path import isfile, join
import os

app = Flask(__name__, static_folder="react_app/react_ul/build/static", template_folder="react_app/react_ul/build")

CORS(app)

'''@app.before_first_request
def before_first_request_func():
    shared_var = 2'''

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/get_default_data')
def default_data():
    data = model.get_default_data()

    data['result'] = 'success'

    return data

@app.route('/extract_from_image', methods = ['POST'])
def extract_from_image():
    print('test logging app.py')

    #imgFile = request.form['imgFile']
    imgFile = request.files['imgFile']   #imgFile is <class werkzeug.datastructures.FileStorage>

    filename = imgFile.filename

    imgFile.save(filename)

    #send_text(str(type(imgFile)))

    if lock.acquire(blocking=False):  #lock is free, i can enter
        dict_obj = model.get_middle_output_image(filename)
        inference = model.infer(filename)
        os.remove(filename)
        lock.release()

        dict_obj['result'] = 'success'
        dict_obj['inference'] = inference

        send_text(str(get_memory_used()))
        print(str(get_memory_used()))

        return json.dumps(dict_obj)
    else: #lock was already taken
        return json.dumps({'result': 'server_too_busy'})


def init():
    print('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
    send_text('unhidden_layers started up!')
    
def count_files(mypath):  #count the files in a directory. Just to make sure i was deleting the images correctly
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]

    return len(onlyfiles)


init()

print_current_RAM_usage()

lock = threading.Lock()

model = Model()

print_current_RAM_usage()

port = environ.get("PORT", 5000)
print('port: ' + str(port))
app.run(host='0.0.0.0', port=port, threaded=True)
