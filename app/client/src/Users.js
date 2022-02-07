import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

function Users() {
  
  const [data, setData] = useState([{}])

  useEffect(()=> {
    fetch("/users", {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
        console.log(data.users)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.users === "undefined") ? (
        <p>Loading ...</p>
        ) : (
        Object.entries(data.users).map(([userId, name]) =>
          <><p>{userId}: {name}</p><User
            value={name}
            onClick={() => handleUserClick(userId)} />
            <Link to={`/users/${userId}/todolists`}>{name}</Link>
            </>
        )
      )}
    </div>
  )
}

function User(props) {
  return (
    <button className="user" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function handleUserClick(userId) {
  
}

export default Users;