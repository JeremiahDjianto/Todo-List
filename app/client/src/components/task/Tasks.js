import React from "react";
import CreateTask from "./CreateTask";
import DeleteTask from "./DeleteTask";
import { Button, Container, Row, Col } from "react-bootstrap";


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
            <div className="Tasks">
                <Container>
                    {typeof this.state.data.tasks === "undefined" ? (
                        <p>Loading ...</p>
                    ) : (
                        Object.entries(this.state.data.tasks).map(([taskId, taskName]) => 
                            <Row className="my-2" key={taskId}>
                                <Col xs={2}>
                                    {taskName}
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={() => this.toggleDelete(taskId)}>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    )}
                    <Button variant="secondary" onClick={this.toggleCreate}>
                        Create New Task
                    </Button>
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
        if (prevState.create && !this.state.create) {
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
    
}

export default Tasks;