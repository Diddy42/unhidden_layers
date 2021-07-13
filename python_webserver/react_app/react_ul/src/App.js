import './App.css';
import * as api from './api.js'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render(){
    return (
      <Container>
        <Button onClick={this.handleClick}>
          AAAAAAA
        </Button>
      </Container>
    );
  }

  handleClick = () => {
    api.testRequestJson()
    .then((res) => {
      console.log('testRequest then')
      console.log(res)
    })
    .catch((err) => {
      console.log('testRequest catch')
      console.log(err)
    })
  }
  
  
}

export default App;
