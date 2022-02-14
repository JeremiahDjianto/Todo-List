import React from "react";
import { Button, CloseButton, Form, Row, Col } from "react-bootstrap";


class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The task ${this.state.name} was created.`);
        fetch(`/users/${this.props.userId}/todolists/${this.props.todolistId}/tasks?&name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleName(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <div className="CreateTask">
                <Form>
                    <Row className="my-2">
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label style={{ color: "white" }}>
                                    Task Name
                                </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Task Name Here"
                                    value={this.state.name}
                                    onChange={this.handleName}
                                />
                            </Form.Group>
                        </Col>
                        <Col className="mt-4">
                            <Button className="my-2" variant="success" onClick={this.handleSubmit}>
                                Confirm
                            </Button>
                        </Col>
                        <Col>
                            <CloseButton className="my-2 float-end" variant="white" onClick={this.handleClose} />
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default CreateTask;