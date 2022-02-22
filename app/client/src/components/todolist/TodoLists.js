import React from 'react';
import { Link } from 'react-router-dom';
import TodoListHeader from '../TodoListHeader';
import CreateTodoList from './CreateTodoList';
import DeleteTodoList from './DeleteTodoList';
import "../common.css";
import { Button, Card, Container, Row, Col } from "react-bootstrap";


class TodoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: this.props.userId,
      create: false, delete: false, toBeDeleted: "", data: {} };
  }

  render() {
    return (
      <div className="list-page">
        <Container>
          <TodoListHeader subtitle="My Todo-Lists" />
          {(typeof this.state.data.todolists === "undefined") ? (
            <p>Loading ...</p>
            ) : (
            Object.entries(this.state.data.todolists).map(([todolistId, name]) =>
            <Row key={todolistId} className="my-3">
              <Col xs={10}>
                <Link className="link" to={`/users/${this.state.userId}/todolists/${todolistId}/tasks`}
                  style={{ color: "black" }}>
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
                <Button className="float-end" size="lg" variant="danger" onClick={() => this.toggleDelete(todolistId)}>
                  Delete
                </Button>
              </Col>
            </Row>
            )
          )}
          <div className="text-center">
            <Button className="my-2" size="lg" variant="secondary" onClick={this.toggleCreate}>
              Create New Todo-List
            </Button>
          </div>
          {this.state.create? 
            <CreateTodoList userId={this.state.userId} toggle={this.toggleCreate} />
            : null}
          {this.state.delete? 
            <DeleteTodoList userId={this.state.userId} todolistId={this.state.toBeDeleted} toggle={this.toggleDelete} />
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
    fetch(`/users/${this.state.userId}/todolists`, {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        this.setState({ data: data })
        console.log(data)
      }
    );
  }

  toggleCreate = () => {
    this.setState({ create: !this.state.create});
  }

  toggleDelete = (todolistId) => {
    this.setState({ toBeDeleted: todolistId});
    this.setState({ delete: !this.state.delete});
  }
}

export default TodoLists;