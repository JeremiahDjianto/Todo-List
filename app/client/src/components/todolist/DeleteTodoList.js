import React from "react";
import { Button, Form, Row, Col }  from "react-bootstrap";


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
                <Button className="my-2" variant="danger" size="sm" onClick={this.handleClose}>
                    &times;
                </Button>
                <p>Are you sure you want to delete this Todo-List?</p>
                <Button className="my-2" variant="success" onClick={this.handleSubmit}>
                    Confirm
                </Button>
            </div>
        );
    }
}

export default DeleteTodoList;