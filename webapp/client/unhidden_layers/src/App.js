import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadImgButton from './UploadImgButton.js'
import * as api from './api.js'

class App extends React.Component {
  constructor(props){
    super(props)
    api.requestImage('test')
    .then((res) => {
      console.log('app.js - requestImage then')
      console.log(res)
    })
    .catch((res) => {
      console.log('app.js - requestImage catch')
      console.log(res)
    })
  }

  render(){
    return <>
      <UploadImgButton/>
    </>
  }

  /*
  fetch example
  testGet = () => {
    fetch('http://localhost:8080/')
      .then(res => console.log(res))
  }
  */
}

export default App;

/*
Show a basic model with all the layers of the cnn.
After the user uploads a picture, the server sends all the mid-output images to the client (a set number, like 5 random for each layer).
The client displays them.

WIP right now: the user uploads the image, the server sends the mid-output images and the client saves them and displays them.
  upload image:  https://medium.com/@nagachaitanyakonada/image-upload-functionality-cd497a5bba54
*/