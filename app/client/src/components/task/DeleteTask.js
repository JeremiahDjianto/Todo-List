import React from "react";
import { Button, CloseButton, Container, Row, Col } from "react-bootstrap";


class DeleteTask extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The Task with id ${this.props.taskId} was deleted.`);
        fetch(`/users/${this.props.userId}/todolists/${this.props.todolistId}/tasks?taskId=${this.props.taskId}`, {method: "DELETE"});
        event.preventDefault();
        this.handleClose();
    }
    
    render() {
        return (
            <div className="DeleteTask">
                <Row className="my-2">
                    <Col>
                        <p style={{ color: "white" }}>Are you sure you want to delete this Task?</p>
                    </Col>
                    <Col>
                        <Button className="my-2" variant="success" onClick={this.handleSubmit}>
                            Confirm
                        </Button>
                    </Col>
                    <Col>
                        <CloseButton className="my-2 float-end" variant="white" onClick={this.handleClose} />
                    </Col>
                </Row>   
            </div>
        );
    }
}

export default DeleteTask;