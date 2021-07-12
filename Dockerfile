FROM python:3

#comment either the RUN git clone ... OR the following two lines (RUN and COPY)
#if you leave the git clone, it will get the code from git
#if you leave the RUN and COPY, it will get the code from the local directory

RUN pip3 install Flask

#RUN git clone https://github.com/Diddy42/unhidden_layers.git

RUN mkdir /unhidden_layers/
COPY . /unhidden_layers/

WORKDIR /unhidden_layers/python_webserver/

#CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]
CMD ["python3", "app.py"]