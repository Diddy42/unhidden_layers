import React from 'react';
import Button from 'react-bootstrap/Button'
import * as api from './api.js'

class UploadImgButton extends React.Component {
    render(){ 
        return <>
            <h1>Upload image:</h1>
            <input type="file" id="fileUpload" />

            <Button onClick={ () => this.handleClick() }>
                Save
            </Button>
        </>
        
    }

    handleClick = () => {
        console.log('uploadImgButton - i should upload the image now')
        
        api.sendImage(document.querySelector('#fileUpload').files[0])
    }
}

export default UploadImgButton

/*
inspiration: https://flaviocopes.com/file-upload-using-ajax/
*/