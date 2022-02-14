import React from "react";
import { Button, Form, Row, Col }  from "react-bootstrap";


class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userId: "", name: ""};

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The user ${this.state.name} was created.`);
        fetch(`/users?name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleName(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <div className="CreateUser">
                <Button className="my-2" variant="danger" size="sm" onClick={this.handleClose}>
                    &times;
                </Button>
                <Form>
                    <Row>
                        <Form.Group controlId="formName">
                            <Form.Label>
                                User Name
                            </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Your Name Here"
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

export default CreateUser;