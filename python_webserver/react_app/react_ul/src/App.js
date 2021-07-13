import './App.css';
import * as api from './api.js'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { cnt: 0 };
  }

  render(){
    return (
      <Container>
        <Button onClick={this.handleClick}>
          {this.state.cnt}
        </Button>
      </Container>
    );
  }

  handleClick = () => {
    api.testRequestJson()
    .then((res) => {
      console.log('testRequest then')
      console.log(res)

      this.setState({ cnt: res.number });
    })
    .catch((err) => {
      console.log('testRequest catch')
      console.log(err)
    })
  }
  
  
}

export default App;
