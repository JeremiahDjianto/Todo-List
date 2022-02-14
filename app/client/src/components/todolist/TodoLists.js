import React from 'react';
import { Link } from 'react-router-dom';
import CreateTodoList from './CreateTodoList';
import DeleteTodoList from './DeleteTodoList';
import { Button, Container, Row, Col } from "react-bootstrap";


class TodoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: this.props.userId,
      create: false, delete: false, toBeDeleted: "", data: {} };
  }

  render() {
    return (
      <div className="TodoLists">
        <Container>
          {(typeof this.state.data.todolists === "undefined") ? (
            <p>Loading ...</p>
            ) : (
            Object.entries(this.state.data.todolists).map(([todolistId, name]) =>
              <Row className="my-2" key={todolistId}>
                <Col xs={2}>
                  <Link to={`/users/${this.state.userId}/todolists/${todolistId}/tasks`}>
                    <Button>
                      {name}
                    </Button>
                  </Link>
                </Col>
                <Col>
                <Button variant="danger" onClick={() => this.toggleDelete(todolistId)}>
                  Delete
                </Button>
                </Col>
              </Row>
            )
          )}
          <Button variant="secondary" onClick={this.toggleCreate}>
            Create New Todo-List
          </Button>
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
    if (prevState.create && !this.state.create) {
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