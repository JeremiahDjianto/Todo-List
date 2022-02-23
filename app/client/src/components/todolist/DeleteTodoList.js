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
        const todolistId = this.props.todolistId;

        
        fetch(`/users/${this.props.userId}/todolists?todolistId=${todolistId}`, {method: "DELETE"}).then(
            () => {
                event.preventDefault();
                this.handleClose();
                alert(`The Todo-List ${todolistId} was deleted.`);
            }
        ).catch(
            () => {
                alert(`An error occured trying to delete the Todo-List ${todolistId}`)
            }
        );
        
    }
    
    render() {
        return (
            <div className="DeleteTodoList">
                <Row className="my-2">
                    <Col>
                        <p className="mt-3" style={{ color: "white" }}>Are you sure you want to delete this Todo-List?</p>
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