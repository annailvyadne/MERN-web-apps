import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        await axios.post('http://localhost:5000/api/tasks', { title });
        setTitle('');
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Add a new task..." 
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((task) => (
                    <TodoItem key={task._id} task={task} deleteTask={deleteTask} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
