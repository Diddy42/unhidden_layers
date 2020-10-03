import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import UploadImgButton from './UploadImgButton.js'
import FeatureImg from './FeatureImg.js'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {unique_id : -1};
  }

  render(){
    console.log(this.state)
    return <>
      <Container fluid>
        <Row>
          <Col><UploadImgButton setId={this.setUniqueId}/></Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Layer #2</th>
                  <th>Layer #5</th>
                  <th>Layer #9</th>
                  <th>Layer #13</th>
                  <th>Layer #17</th>
                  <th>Layer #18</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><FeatureImg filename='l2_0.png'/></td>
                  <td><FeatureImg filename='l5_0.png'/></td>
                  <td><FeatureImg filename='l9_0.png'/></td>
                  <td><FeatureImg filename='l13_0.png'/></td>
                  <td><FeatureImg filename='l17_0.png'/></td>
                  <td><FeatureImg filename='l18_0.png'/></td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        
      </Container>
    </>
  }

  setUniqueId = (id) => {
    this.setState({ unique_id : id });
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