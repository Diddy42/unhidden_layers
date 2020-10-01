import React from 'react';
import Button from 'react-bootstrap/Button'

class UploadImgButton extends React.Component {
    constructor(props){
        super(props)
    }

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
        console.log('i should upload the image now')
        console.log(document.querySelector('#fileUpload').files[0])
    }
}

export default UploadImgButton

/*
inspiration: https://flaviocopes.com/file-upload-using-ajax/
*/