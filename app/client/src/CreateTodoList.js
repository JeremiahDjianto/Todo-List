import React from "react";
class CreateTodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todolistId: "", name: ""};

        this.handleTodoListId = this.handleTodoListId.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The Todo-List ${this.state.name} was created.`);
        fetch(`/users/${this.props.userId}/todolists?todolistId=${this.state.todolistId}&name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleTodoListId(event) {
        this.setState({todolistId: event.target.value});
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
                            Todo-List Id:
                            <input type="text" value={this.state.todolistId} onChange={this.handleTodoListId} />
                        </label>
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