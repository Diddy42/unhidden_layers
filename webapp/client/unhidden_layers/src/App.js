import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return <>
      <Button onClick={() => this.testGet()}>
      Test button
      </Button>
    </>
  }

  testGet = () => {
    fetch('http://localhost:8080/')
      .then(res => console.log(res))
  }
}

export default App;
