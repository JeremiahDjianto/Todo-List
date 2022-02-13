import React from "react";


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
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClose}>
                        &times;
                    </span>
                    <p>
                        Are you sure you want to delete this Task?
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        );
    }
}

export default DeleteTask;