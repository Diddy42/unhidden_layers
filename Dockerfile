#FROM python:3
FROM nikolaik/python-nodejs:python3.9-nodejs16

#comment either the RUN git clone ... OR the following two lines (RUN and COPY)
#if you leave the git clone, it will get the code from git
#if you leave the RUN and COPY, it will get the code from the local directory

RUN pip3 install Flask
RUN pip3 install keras
RUN pip3 install tensorflow
RUN pip3 install matplotlib

#RUN pip install --upgrade keras keras-applications

#RUN git clone https://github.com/Diddy42/unhidden_layers.git

RUN mkdir /unhidden_layers/
COPY . /unhidden_layers/

WORKDIR /unhidden_layers/python_webserver/react_app/react_ul/

RUN npm install
RUN npm run build

WORKDIR /unhidden_layers/python_webserver/

#CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD ["python3", "app.py"]
#CMD ls build/