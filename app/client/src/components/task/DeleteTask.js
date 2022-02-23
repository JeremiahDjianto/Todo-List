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
        const taskId = this.props.taskId;

        fetch(`/users/${this.props.userId}/todolists/${this.props.todolistId}/tasks?taskId=${taskId}`, {method: "DELETE"}).then(
            () => {
                event.preventDefault();
                this.handleClose();
                alert(`The Task with id ${taskId} was deleted.`);
            }
        ).catch(
            () => {
                alert(`An error occured trying to delete the task ${taskId}.`)
            }
        );
        
    }
    
    render() {
        return (
            <div className="DeleteTask">
                <Row className="my-2">
                    <Col>
                        <p className="mt-3" style={{ color: "white" }}>Are you sure you want to delete this Task?</p>
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