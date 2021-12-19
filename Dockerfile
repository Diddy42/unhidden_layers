#FROM python:3
FROM nikolaik/python-nodejs:python3.9-nodejs16

#comment either the RUN git clone ... OR the following two lines (RUN and COPY)
#if you leave the git clone, it will get the code from git
#if you leave the RUN and COPY, it will get the code from the local directory

RUN pip3 install Flask
RUN pip3 install -U flask-cors
RUN pip3 install keras
RUN pip3 install tensorflow
RUN pip3 install matplotlib
RUN pip3 install psutil

#RUN pip install --upgrade keras keras-applications

#RUN git clone https://github.com/Diddy42/unhidden_layers.git

RUN mkdir /unhidden_layers/
COPY . /unhidden_layers/

WORKDIR /unhidden_layers/python_webserver/react_app/react_ul/

RUN npm install

#why you should update regularly: https://github.com/browserslist/browserslist#browsers-data-updating
RUN npx browserslist@latest --update-db

RUN npm run build

WORKDIR /unhidden_layers/python_webserver/

#CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD ["python3", "app.py"]
#CMD ls build/