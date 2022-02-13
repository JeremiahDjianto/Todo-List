import React from "react";
import CreateTask from "./CreateTask";
import DeleteTask from "./DeleteTask";

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: this.props.userId,
                        todolistId: this.props.todolistId,
                        create: false,
                        delete: false,
                        toBeDeleted: "",
                        data: {}
                    };
    }

    render() {
        return (
            <div>
                {typeof this.state.data.tasks === "undefined" ? (
                    <p>Loading ...</p>
                ) : (
                    Object.entries(this.state.data.tasks).map(([taskId, taskName]) => 
                        <p key={taskId}>
                            {taskName}
                            &emsp;
                            <button onClick={() => this.toggleDelete(taskId)}>
                                Delete
                            </button>
                        </p>
                    )
                )}
                <button onClick={this.toggleCreate}>
                    Create New Task
                </button>
                {this.state.create? 
                    <CreateTask userId={this.state.userId} todolistId={this.state.todolistId} toggle={this.toggleCreate} />
                    : null}
                {this.state.delete? 
                    <DeleteTask userId={this.state.userId} todolistId={this.state.todolistId} 
                        taskId={this.state.toBeDeleted} toggle={this.toggleDelete} />
                    : null}
            </div>
        );
    }

    componentDidMount() {
        this.fetchMembers();
    }

    componentDidUpdate(_prevProps, prevState) {
        if (prevState.create && !this.state.create) {
          this.fetchMembers();
        }
    }

    fetchMembers = () => {
        fetch(`/users/${this.state.userId}/todolists/${this.state.todolistId}/tasks`, {method: "GET"}).then(
            response => response.json()
        ).then(
            data => {
                this.setState({data: data})
                console.log(data)
            }
        );
    }

    toggleCreate = () => {
        this.setState({ create: !this.state.create});
    }
    
    toggleDelete = (taskId) => {
    this.setState({ toBeDeleted: taskId});
    this.setState({ delete: !this.state.delete});
    }
    
}

export default Tasks;