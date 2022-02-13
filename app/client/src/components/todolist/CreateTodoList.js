import React from "react";


class CreateTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todolistId: "", name: ""};

        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The Todo-List ${this.state.name} was created.`);
        fetch(`/users/${this.props.userId}/todolists?name=${this.state.name}`, {method: "POST"});
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
                            Todo-List Name:
                            <input type="text" value={this.state.name} onChange={this.handleName} />
                        </label>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateTodoList;