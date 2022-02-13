import React from "react";
import { useParams } from "react-router-dom";
import TodoLists from "./TodoLists";


function TodoListsWrapper () {
    const { userId } = useParams();

    return (
        <div>
            <TodoLists userId={userId} />
        </div>
    )
}

export default TodoListsWrapper;