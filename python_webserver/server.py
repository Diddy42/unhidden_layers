'''
https://blog.learningdollars.com/2019/11/29/how-to-serve-a-reactapp-with-a-flask-server/
'''

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == "__main__":
    app.run(debug=True)