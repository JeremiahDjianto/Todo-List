import React from 'react';
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {createUser: false, data: {}};
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.createUser && !this.state.createUser) {
      this.fetchUsers();
      console.log("Updated!");
      console.log(`prevState: ${prevState.createUser}`);
      console.log(`currState: ${this.state.createUser}`);
    }
    
  }

  fetchUsers = () => {
    fetch("/users", {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        this.setState({ data: data })
        console.log(data)
        console.log(data.users)
      }
    );
  }

  toggleCreateUser = () => {
    this.setState({createUser: !this.state.createUser});
  }

  render() {
    return (
      <div>
        {(typeof this.state.data.users === "undefined") ? (
          <p>Loading ...</p>
        ) : (
          Object.entries(this.state.data.users).map(([userId, name]) => 
          <p>
            <Link to={`/users/${userId}/todolists`}>{name}</Link>
          </p>
          )
        )}
        <button onClick={this.toggleCreateUser}>
          Create New User
        </button>
        {this.state.createUser ?
          <CreateUser toggle={this.toggleCreateUser} />
          : null}
      </div>
    );
  }
}

export default Users;