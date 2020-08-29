import React from 'react';
import Button from 'react-bootstrap/Button'

class UploadImgButton extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return <>
            <Button onClick={ () => this.handleClick() }>
                Upload image
            </Button>
        </>
    }

    handleClick = () => {
        console.log('i should upload the image now')
    }
}

export default UploadImgButton