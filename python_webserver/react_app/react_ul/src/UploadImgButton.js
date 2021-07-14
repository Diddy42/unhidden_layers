import React from 'react';

class UploadImgButton extends React.Component {
    render(){ 
        const default_pic = require('./images/default_photo.png');
        
        return <>
            <h1>Upload image:</h1>
            <input type="file" id="fileUpload" onInput={this.onInput} />
            <img id='your_img' src={default_pic.default} alt=' ' width="20%" height="20%"/>
        </>
        
    }

    onInput = () => {
        document.getElementById('your_img').src = URL.createObjectURL(document.querySelector('#fileUpload').files[0])
    }
}

export default UploadImgButton;

/*
inspiration: https://flaviocopes.com/file-upload-using-ajax/
*/
