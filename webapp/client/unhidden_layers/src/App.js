import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadImgButton from './UploadImgButton.js'
import FeatureImg from './FeatureImg.js'

class App extends React.Component {
  render(){
    return <>
      <UploadImgButton/>
      <FeatureImg filename='l2_2.png'/>
    </>
  }
}

export default App;

/*
Show a basic model with all the layers of the cnn.
After the user uploads a picture, the server sends all the mid-output images to the client (a set number, like 5 random for each layer).
The client displays them.

WIP right now: the user uploads the image, the server sends the mid-output images and the client saves them and displays them.
  upload image:  https://medium.com/@nagachaitanyakonada/image-upload-functionality-cd497a5bba54
*/