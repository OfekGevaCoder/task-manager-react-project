import { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from "../useFetch.js";
import TaskList from '../TaskList.js';

const Todo = () => {
    const { error, isPending, data: initialTasks } = useFetch('http://localhost:8000/tasks');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (initialTasks) {
            setTasks(initialTasks);
        }
    }, [initialTasks]);

    const todoTasks = tasks.filter(task => task.stage.trim().toLowerCase() === 'todo');

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            })
            .catch(err => {
                console.error('Failed to delete task:', err);
            });
    };

    const handleEdit = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const handleAdd = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="tasks">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <TaskList 
                tasks={todoTasks} 
                pageTitle="ToDo Tasks" 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                handleAdd={handleAdd}
                pageType="ToDo" 
                /> 
        </div>
    );
}

export default Todo;
