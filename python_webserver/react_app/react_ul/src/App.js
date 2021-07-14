import './App.css';
import * as api from './api.js'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import ResultsTable from './ResultsTable.js';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
      request_status: "not_requested",
      data_received: undefined
     };
  }

  render(){
    return (
      <Container>
        <Button 
          onClick={this.handleClick}
          disabled={this.state.request_status.localeCompare("pending") === 0}
        >
          {this.state.request_status.localeCompare("pending") === 0 && "Waiting for server"}
          {this.state.request_status.localeCompare("pending") !== 0 && "Extract!"}
        </Button>

        <ResultsTable data={this.state.data_received} status={this.state.request_status} />
      </Container>
    );
  }

  handleClick = () => {
    this.setState({ request_status: "pending" });

    api.extractFromImage()
    .then((res) => {
      console.log(res)

      if(res.result.localeCompare("success") === 0){
        this.setState({ request_status: "success", data_received: res });
      }
      else{
        this.setState({ request_status: "server_too_busy" });
      }
    })
    .catch((err) => {
      console.log('testRequest catch')
      console.log(err)
      this.setState({ request_status: "connection_error" });
    })
  }
  
  
}

export default App;
