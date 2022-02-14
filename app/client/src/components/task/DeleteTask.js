import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";


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
                <Button className="my-2" variant="danger" size="sm" onClick={this.handleClose}>
                    &times;
                </Button>
                <p>Are you sure you want to delete this Task?</p>
                <Button className="my-2" variant="success" onClick={this.handleSubmit}>
                    Confirm
                </Button>
            </div>
        );
    }
}

export default DeleteTask;