import React from "react";
import { Button, CloseButton, Form, Row, Col }  from "react-bootstrap";


class DeleteUser extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The user ${this.props.userId} was deleted.`);
        fetch(`/users?userId=${this.props.userId}`, {method: "DELETE"});
        event.preventDefault();
        this.handleClose();
    }
    
    render() {
        return (
            <div className="DeleteUser">
                <Row className="my-2">
                    <Col>
                        <p style={{ color: "white" }}>Are you sure you want to delete this user?</p>
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

export default DeleteUser;