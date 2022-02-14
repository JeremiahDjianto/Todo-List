import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";


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
                <Button className="my-2" variant="danger" size="sm" onClick={this.handleClose}>
                    &times;
                </Button>
                <Form>
                    <Row>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                Task Name
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Task Title"
                                value={this.state.name}
                                onChange={this.handleName}
                            />
                            <Button className="my-2" variant="success" onClick={this.handleSubmit}>
                                Confirm
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default CreateTask;