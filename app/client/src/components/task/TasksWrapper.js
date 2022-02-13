import React from "react";
import { useParams } from "react-router-dom";
import Tasks from "./Tasks";


function TasksWrapper() {
    const { userId, todolistId } = useParams();

    return(
        <div>
            <Tasks userId={userId} todolistId={todolistId} />
        </div>
    )
}

export default TasksWrapper;