import React from 'react';
import Button from 'react-bootstrap/Button'
import * as api from './api.js'

class UploadImgButton extends React.Component {
    render(){ 
        return <>
            <h1>Upload image:</h1>
            <input type="file" id="fileUpload" />
            <img id='your_img' src="#" alt=' ' width="50%" height="50%"/>

            <Button onClick={ () => this.handleClick() }>
                Save
            </Button>
        </>
        
    }

    handleClick = () => {
        console.log('uploadImgButton - i should upload the image now')
        this.props.setId(-1, undefined)
        
        document.getElementById('your_img').src = URL.createObjectURL(document.querySelector('#fileUpload').files[0])
        
        api.sendImage(document.querySelector('#fileUpload').files[0])
        .then((res) => {
            console.log('uploadImgButton.js - handleClick - sendImage then')
            this.props.setId(res.unique_id, res.load_gif)
        })
    }
}

export default UploadImgButton;

/*
inspiration: https://flaviocopes.com/file-upload-using-ajax/
*/
