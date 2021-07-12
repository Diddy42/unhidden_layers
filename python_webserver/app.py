'''
https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/

https://docs.docker.com/language/python/build-images/
'''

#you can see it on http://localhost:5000

import random
from flask import Flask
app = Flask(__name__)

'''@app.before_first_request
def before_first_request_func():
    shared_var = 2'''

@app.route('/')
def home_page():
    r = random.randint(0, 100)
    return 'your random number (1, 100): ' + str(r)

def init():
    print('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    

init()
app.run(host='0.0.0.0')
