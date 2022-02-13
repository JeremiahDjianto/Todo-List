import React from 'react';
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {create: false, delete: false, toBeDeleted: "", data: {}};
  }

  render() {
    return (
      <div>
        {(typeof this.state.data.users === "undefined") ? (
          <p>Loading ...</p>
        ) : (
          Object.entries(this.state.data.users).map(([userId, name]) => 
          <p key={userId}>
            <Link to={`/users/${userId}/todolists`}>{name}</Link>
            &emsp;
            <button onClick={() => this.toggleDelete(userId)}>
              Delete
            </button>
          </p>
          )
        )}
        <button onClick={this.toggleCreate}>
          Create New User
        </button>
        {this.state.create ?
          <CreateUser toggle={this.toggleCreate} />
          : null}
        {this.state.delete ?
              <DeleteUser toggle={this.toggleDelete} userId={this.state.toBeDeleted} />
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

  toggleDelete = (userId) => {
    this.setState({toBeDeleted: userId});
    this.setState({delete: !this.state.delete});
  }
}

export default Users;