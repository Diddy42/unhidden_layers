'''
https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/

https://docs.docker.com/language/python/build-images/
'''

#you can see it on http://localhost:5000

from flask import Flask
from os import environ
from mobilenet import Model
from utils import print_current_RAM_usage
import time

app = Flask(__name__)

'''@app.before_first_request
def before_first_request_func():
    shared_var = 2'''

@app.route('/')
def home_page():
    st = time.time()
    res = model.get_middle_output_image()
    end = time.time()

    print('result calculated in ' + str(round(end - st, 1)) + ' sec')

    return 'result calculated in ' + str(round(end - st, 1)) + ' sec'

def init():
    print('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
    
    

init()

print_current_RAM_usage()

model = Model()

print_current_RAM_usage()

port = environ.get("PORT", 5000)
print('port: ' + str(port))
app.run(host='0.0.0.0', port=port)
