import React from 'react';
import CreateTodoList from './CreateTodoList';

class TodoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: this.props.userId,
      create: false, data: {} };
  }

  render() {
    return (
      <div>
        {(typeof this.state.data.todolists === "undefined") ? (
          <p>Loading ...</p>
          ) : (
          Object.entries(this.state.data.todolists).map(([todolistId, name]) =>
            <p>{todolistId}: {name}</p>
          )
        )}
        <button onClick={this.toggleCreate}>
          Create New Todo-List
        </button>
        {this.state.create? 
          <CreateTodoList userId={this.state.userId} toggle={this.toggleCreate} />
          : null}
      </div>
    );
  }

  componentDidMount() {
    this.fetchMembers();
  }
  
  compoenentDidUpdate(_prevProps, prevState) {
    if (prevState.create && !this.state.create) {
      this.fetchMembers();
    }
  }
  
  fetchMembers = () => {
    fetch(`/users/${this.state.userId}/todolists`, {method: "GET"}).then(
      response => response.json()
    ).then(
      data => {
        this.setState({ data: data })
        console.log(data);
      }
    );
  }

  toggleCreate = () => {
    this.setState({ create: !this.state.create});
  }
}

export default TodoLists;