import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class UploadImgButton extends React.Component {
    constructor(props){
        super(props);

        //this.default_pic = require('./images/default_photo.png');

        this.state = {img_src : require('./images/default_photo.png').default};
    }

    render(){ 
        return <>
                <Container fluid>
                    <Row>
                        <Col md="auto">
                            <Alert variant='info'>
                                <h2>Upload image:</h2>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
                <input type="file" id="fileUpload" onInput={this.onInput} />
                <img id='your_img' src={this.state.img_src} alt=' ' width="20%" height="20%"/>
            </>
    }

    onInput = () => {
        //document.getElementById('your_img').src = URL.createObjectURL(document.querySelector('#fileUpload').files[0])

        this.setState({img_src : URL.createObjectURL(document.querySelector('#fileUpload').files[0])});
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.status.localeCompare(prevProps.status) !== 0){
            if(this.props.status.localeCompare("received_default_data") === 0){
                this.setState({ img_src: 'data:image/png;base64,' + this.props.data.original_image });
            }
        }
    }
}

export default UploadImgButton;

/*
inspiration: https://flaviocopes.com/file-upload-using-ajax/
*/

