import React, {useState, useEffect} from 'react';

function App() {
  
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
            <p>{userId}: {name}</p>

          )
         )}
    </div>
  )
}

export default App;
