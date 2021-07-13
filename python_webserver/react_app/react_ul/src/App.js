import logo from './logo.svg';
import './App.css';
import * as api from './api.js'

function App() {
  console.log("test log")

  api.testRequest()
  .then((res) => {
    console.log('testRequest then')
    console.log(res)
  })
  .catch((err) => {
    console.log('testRequest catch')
    console.log(err)
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
