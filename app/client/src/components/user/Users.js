import React from 'react';
import { Link } from "react-router-dom";
import TodoListHeader from '../TodoListHeader';
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import "../common.css";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {create: false, delete: false, toBeDeleted: "", data: {}};
  }

  render() {
    return (
      <div className="list-page">        
        <Container>
        <TodoListHeader subtitle="My Users" />  
          {(typeof this.state.data.users === "undefined") ? (
            <p>Loading ...</p>
          ) : (
            Object.entries(this.state.data.users).map(([userId, name]) => 
            <Row key={userId} className="my-3">
              <Col xs={10}>
                <Link className="link" to={`/users/${userId}/todolists`} style={{ color: "black" }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {name}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col className="my-auto">
                <Button className="float-end" size="lg" variant="danger" onClick={() => this.toggleDelete(userId)}>
                  Delete
                </Button>
              </Col>
            </Row>
            )
          )}
          <div className="text-center">
            <Button className="my-2" size="lg" variant="secondary" onClick={this.toggleCreate}>
              Create New User
            </Button>
          </div>
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
    if ((prevState.create && !this.state.create) || (prevState.delete && !this.state.delete)) {
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