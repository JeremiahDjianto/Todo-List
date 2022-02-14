import React from "react";
import { Button, Form, Row, Col }  from "react-bootstrap";


class CreateTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todolistId: "", name: ""};

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The Todo-List ${this.state.name} was created.`);
        fetch(`/users/${this.props.userId}/todolists?name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleName(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <div className="CreateTodoList">
                <Button className="my-2" variant="danger" size="sm" onClick={this.handleClose}>
                    &times;
                </Button>
                <Form>
                    <Row>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                Todo-List Title
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Todo-List Title"
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

export default CreateTodoList;