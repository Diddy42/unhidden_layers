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
    if(this.state.unique_id === -1){
      return <>
        <Container fluid>
          <Row>
            <Col><UploadImgButton setId={this.setUniqueId}/></Col>
          </Row>
        </Container>
      </>
    }
    else{
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
                  <th>Layer number</th>
                  <th>Random output of this layer</th>
                  <th>Random output of this layer</th>
                  <th>Random output of this layer</th>
                </tr>
              </thead>

              <tbody>
                {this.createTableRow(2)}
                {this.createTableRow(5)}
                {this.createTableRow(9)}
                {this.createTableRow(13)}
                {this.createTableRow(17)}
                {this.createTableRow(18)}
              </tbody>
            </Table>
          </Col>
        </Row>
        
      </Container>
    </>
    }
  }

  createTableRow = (layer_number) => {
    console.log(layer_number)
    return <tr>
      <td><h3>Layer #{layer_number}</h3></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_0.png'}/></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_1.png'}/></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_2.png'}/></td>
    </tr>
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
