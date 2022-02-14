import React from "react";
import { Button, CloseButton, Form, Row, Col }  from "react-bootstrap";


class DeleteTodoList extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The Todo-List ${this.props.todolistId} was deleted.`);
        fetch(`/users/${this.props.userId}/todolists?todolistId=${this.props.todolistId}`, {method: "DELETE"});
        event.preventDefault();
        this.handleClose();
    }
    
    render() {
        return (
            <div className="DeleteTodoList">
                <Row className="my-2">
                    <Col>
                        <p style={{ color: "white" }}>Are you sure you want to delete this Todo-List?</p>
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

export default DeleteTodoList;