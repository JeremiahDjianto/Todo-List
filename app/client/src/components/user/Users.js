import React from 'react';
import { Link } from "react-router-dom";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import "./Users.css";
import { Button, Container, Row, Col } from "react-bootstrap";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {create: false, delete: false, toBeDeleted: "", data: {}};
  }

  render() {
    return (
      <div className="Users">
        <Container>
          {(typeof this.state.data.users === "undefined") ? (
            <p>Loading ...</p>
          ) : (
            Object.entries(this.state.data.users).map(([userId, name]) => 
            <Row className="my-2" key={userId}>
              <Col xs={2}>
                <Link to={`/users/${userId}/todolists`}>
                  <Button>
                    {name}
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button variant="danger" onClick={() => this.toggleDelete(userId)}>
                  Delete
                </Button>
              </Col>
            </Row>
            )
          )}
          <Button variant="secondary" onClick={this.toggleCreate}>
            Create New User
          </Button>
          {this.state.create ?
            <CreateUser toggle={this.toggleCreate} />
            : null}
          {this.state.delete ?
                <DeleteUser toggle={this.toggleDelete} userId={this.state.toBeDeleted} />
                : null}
        </Container>
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