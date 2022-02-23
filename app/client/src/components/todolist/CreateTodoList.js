import React from "react";
import { Button, CloseButton, Form, Row, Col }  from "react-bootstrap";


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
        fetch(`/users/${this.props.userId}/todolists?name=${this.state.name}`, {method: "POST"}).then(
            () => {
                event.preventDefault();
                this.handleClose();
                alert(`The Todo-List ${this.state.name} was created.`);
            }
        ).catch(
            () => {
                alert(`An error occured trying to create the Todo-List ${this.state.name}.`)
            }
        );
        
    }
    
    handleName(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <div className="CreateTodoList">
                <Form>
                    <Row className="my-2">
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label style={{ color: "white" }}>
                                    Todo-List Title
                                </Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Todo-List Title Here"
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

export default CreateTodoList;