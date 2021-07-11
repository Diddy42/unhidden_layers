FROM python:3

RUN mkdir repo; cd repo; git clone https://github.com/Diddy42/unhidden_layers.git

CMD ["ls", "repo/unhidden_layers"]