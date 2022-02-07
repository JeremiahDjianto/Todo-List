import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <h1>Welcome to my Todo-List app :)</h1>
      <Link to="/users">See Users</Link>
    </div>
  )
}

function User(props) {
  return (
    <button className="user" onClick={props.onClick}>
      props.value
    </button>
  )
}

function handleUserClick(userId) {

}

export default App;
