import React from "react";


function TodoListHeader(props) {
    return (
        <div className="TodoListHeader my-4">
            <header>
                <h1 style={{ color: "white"}}>
                    My Todo-List
                </h1>
                <h3 style={{ color: "white"}}>
                    {props.subtitle}
                </h3>
            </header>
        </div>
    )
}

export default TodoListHeader;