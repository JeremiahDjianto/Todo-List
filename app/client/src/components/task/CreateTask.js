import React from "react";


class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The task ${this.state.name} was created.`);
        fetch(`/users/${this.props.userId}/todolists/${this.props.todolistId}/tasks?&name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleName(event) {
        this.setState({name: event.target.value});
    }
    
    render() {
        return (
            <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={this.handleClose}>
                        &times;
                    </span>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Task Name:
                            <input type="text" value={this.state.name} onChange={this.handleName} />
                        </label>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateTask;