import React from "react";
import TodoListHeader from "../TodoListHeader";
import CreateTask from "./CreateTask";
import DeleteTask from "./DeleteTask";
import "../common.css"
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";


class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: this.props.userId,
                        todolistId: this.props.todolistId,
                        create: false,
                        delete: false,
                        toBeDeleted: "",
                        data: {}
                    };
    }

    render() {
        return (
            <div className="list-page">
                <Container>
                    <TodoListHeader subtitle="My Tasks" />
                    {typeof this.state.data.tasks === "undefined" ? (
                        <p>Loading ...</p>
                    ) : (
                        Object.entries(this.state.data.tasks).map(([taskId, taskInfo]) => 
                            <Row key={taskId} className="my-3">
                                <Col xs={10}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {taskInfo["name"]}
                                                <Form.Check 
                                                className="float-end"
                                                type="checkbox" 
                                                defaultChecked={taskInfo["done"]}
                                                onChange={() => this.toggleDone(taskId, (!taskInfo["done"]).toString())} />
                                            </Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col className="my-auto">
                                    <Button className="float-end" size="lg" variant="danger" onClick={() => this.toggleDelete(taskId)}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>           
                        )
                    )}
                    <div className="text-center">
                        <Button className="my-2" size="lg" variant="secondary" onClick={this.toggleCreate}>
                            Create New Task
                        </Button>
                    </div>
                    {this.state.create? 
                        <CreateTask userId={this.state.userId} todolistId={this.state.todolistId} toggle={this.toggleCreate} />
                        : null}
                    {this.state.delete? 
                        <DeleteTask userId={this.state.userId} todolistId={this.state.todolistId} 
                            taskId={this.state.toBeDeleted} toggle={this.toggleDelete} />
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
        fetch(`/users/${this.state.userId}/todolists/${this.state.todolistId}/tasks`, {method: "GET"}).then(
            response => response.json()
        ).then(
            data => {
                this.setState({data: data})
                console.log(data)
            }
        );
    }

    toggleCreate = () => {
        this.setState({ create: !this.state.create});
    }
    
    toggleDelete = (taskId) => {
        this.setState({ toBeDeleted: taskId});
        this.setState({ delete: !this.state.delete});
    }

    toggleDone = (taskId, done) => {
        fetch(`/users/${this.state.userId}/todolists/${this.state.todolistId}/tasks?taskId=${taskId}&done=${done}`, {method: "PUT"}).then(
            response => response.json()
        ).then(
            data => {
                this.setState({data: data})
                console.log(data)
            }
        );
    }
    
}

export default Tasks;