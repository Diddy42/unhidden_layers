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

from flask import Flask, render_template
from os import environ
from mobilenet import Model
from utils import print_current_RAM_usage
import time

app = Flask(__name__, static_folder="react_app/react_ul/build/static", template_folder="react_app/react_ul/build")

'''@app.before_first_request
def before_first_request_func():
    shared_var = 2'''

@app.route('/')
def home_page():
    st = time.time()
    #res = model.get_middle_output_image()
    end = time.time()

    print('result calculated in ' + str(round(end - st, 1)) + ' sec')

    return render_template('index.html')

def init():
    print('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
    
    

init()

print_current_RAM_usage()

#model = Model()

print_current_RAM_usage()

port = environ.get("PORT", 5000)
print('port: ' + str(port))
app.run(host='0.0.0.0', port=port)
