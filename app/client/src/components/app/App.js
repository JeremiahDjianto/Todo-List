import React from 'react';
import { Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="m-5">Welcome to My Todo-List</h1>
        <Link to="/users">
          <Button size="lg">
            See Users
          </Button>
        </Link>
      </header>
    </div>
  )
}

export default App;
