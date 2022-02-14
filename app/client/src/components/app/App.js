import React from 'react';
import { Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my Todo-List app :)</h1>
        <Link to="/users">
          <Button>
            See Users
          </Button>
        </Link>
      </header>
    </div>
  )
}

export default App;
