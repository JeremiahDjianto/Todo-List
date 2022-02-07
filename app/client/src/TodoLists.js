import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";

function TodoLists() {
  const { userId } = useParams();
  
  const [data, setData] = useState([{}])

  useEffect(()=> {
    fetch(`/users/${userId}/todolists`, {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.todolists === "undefined") ? (
        <p>Loading ...</p>
        ) : (
        Object.entries(data.todolists).map(([todolistId, name]) =>
          <><p>{todolistId}: {name}</p>
            </>
        )
      )}
    </div>
  )
}

export default TodoLists;