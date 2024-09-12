import React from 'react';

const TodoItem = ({ task, deleteTask }) => {
    return (
        <li>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default TodoItem;
