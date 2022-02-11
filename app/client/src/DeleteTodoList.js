import React from "react";

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
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClose}>
                        &times;
                    </span>
                    <p>
                        Are you sure you want to delete this Todo-List?
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        );
    }
}

export default DeleteTodoList;