import React from 'react';
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {create: false, data: {}};
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
        <button onClick={this.toggleCreate}>
          Create New User
        </button>
        {this.state.create ?
          <CreateUser toggle={this.toggleCreate} />
          : null}
      </div>
    );
  }

  componentDidMount() {
    this.fetchMembers();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.create && !this.state.create) {
      this.fetchMembers();
    }
    
  }

  fetchMembers = () => {
    fetch("/users", {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        this.setState({ data: data })
      }
    );
  }

  toggleCreate = () => {
    this.setState({create: !this.state.create});
  }
}

export default Users;