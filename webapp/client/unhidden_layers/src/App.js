import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UploadImgButton from './UploadImgButton.js'
import FeatureImg from './FeatureImg.js'
import InferenceResult from './InferenceResult.js'
import * as api from './api.js'
import ResultsTable from './ResultsTable.js'

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {unique_id : -1, json_results : undefined};
  }

  render(){
    //console.log(this.state)

    if(this.state.unique_id === -1){
      return <>
        <Container fluid>
          <Row>
            <Col><UploadImgButton setId={this.setUniqueId}/></Col>
            <Col><InferenceResult results={this.state.json_results}/></Col>
          </Row>
        </Container>
      </>
    }
    else{
      return <>
      <Container fluid>
        <Row>
          <Col><UploadImgButton setId={this.setUniqueId}/></Col>
          <Col><InferenceResult results={this.state.json_results}/></Col>
        </Row>

        <Row>
          <Col>
            <ResultsTable results={this.state.json_results}/>
          </Col>
        </Row>
        
      </Container>
    </>
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.unique_id !== -1 && this.state.unique_id !== prevState.unique_id){
      console.log('unique_id changed, getting results...')
      api.getJsonResults(this.state.unique_id)
      .then((res) => {
        console.log('getJsonResults then')
        //console.log(res)
        this.setState({ json_results : res })
      })
      .catch((err) => {
        console.log('getJsonResults catch')
        console.log(err)
      })
    }
  }

  
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
    if(id === -1){
    	this.setState({ unique_id : id, json_results : undefined });
    }
    else{
    	this.setState({ unique_id : id });
    }
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
