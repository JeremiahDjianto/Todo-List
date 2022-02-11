import React from "react";

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userId: "", name: ""};

        this.handleUserId = this.handleUserId.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.toggle();
    }
    
    handleSubmit(event) {
        alert(`The user ${this.state.name} was created.`);
        fetch(`/users?userId=${this.state.userId}&name=${this.state.name}`, {method: "POST"});
        event.preventDefault();
        this.handleClose();
    }
    
    handleUserId(event) {
        this.setState({userId: event.target.value});
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
                            User Id:
                            <input type="text" value={this.state.userId} onChange={this.handleUserId} />
                        </label>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleName} />
                        </label>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateUser;