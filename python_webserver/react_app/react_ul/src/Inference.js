import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Inference extends React.Component {
    render(){         
        if(this.props.status.localeCompare("success") === 0 || this.props.status.localeCompare("received_default_data") === 0){
            return <>
                <Container fluid className='mt-4 mb-4'>
                    <Row>
                        <Col md="auto">
                            <Alert variant='secondary'>
                                <h3>Model inference: {this.props.data['inference']}</h3>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </>
        }
        else{
            return <> </>
        }
        
    }
}

export default Inference;

