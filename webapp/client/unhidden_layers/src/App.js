import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import UploadImgButton from './UploadImgButton.js'
import FeatureImg from './FeatureImg.js'
import InferenceResult from './InferenceResult.js'
import * as api from './api.js'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {unique_id : -1, json_results : undefined};
  }

  render(){
    console.log(this.state)

    if(this.state.unique_id === -1){
      return <>
        <Container fluid>
          <Row>
            <Col><UploadImgButton setId={this.setUniqueId}/></Col>
            <Col><InferenceResult unique_id={this.state.unique_id}/></Col>
          </Row>
        </Container>
      </>
    }
    else{
      /*
      return <>
      <Container fluid>
        <Row>
          <Col><UploadImgButton setId={this.setUniqueId}/></Col>
          <Col><InferenceResult unique_id={this.state.unique_id}/></Col>
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
              {this.createTableRow(1, 0.5, 1, 1.5)}
              {this.createTableRow(4, 2, 2.5, 3)}
              {this.createTableRow(12, 3.5, 4, 4.5)}
              {this.createTableRow(19, 5, 5.5, 6)}
              {this.createTableRow(30, 6.5, 7, 7.5)}
              {this.createTableRow(44, 8, 8.5, 9)}
              {this.createTableRow(57, 9, 9.5, 10)}
              {this.createTableRow(119, 10.5, 11, 11.5)}
              {this.createTableRow(152, 12, 12.5, 13)}
              </tbody>
            </Table>
          </Col>
        </Row>
        
      </Container>
    </>
    */
    }
  }

  componentDidMount = () => {
    api.getJsonResults(0)
    .then((res) => {
      console.log('getJsonResults then')
      console.log(res)
      this.setState({ json_results : res })
    })
    .catch((err) => {
      console.log('getJsonResults catch')
      console.log(err)
    })
  }

  /*
  createRows = () => {
    layers = [1, 4, 12, 19, 30, 44, 57, 119, 152];
    var i, time_interval = 0.5;

    layers.map( (l) =>  )

    for(i = 0; i < layers.length; i++){

    }
  }
  */
  createTableRow = (layer_number, w1, w2, w3) => {
    console.log(layer_number)
    return <tr>
      <td><h3>Layer #{layer_number}</h3></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_0.png'} sec_wait={w1}/></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_1.png'} sec_wait={w2}/></td>
      <td><FeatureImg filename={this.state.unique_id+'_l' + layer_number + '_2.png'} sec_wait={w3}/></td>
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
