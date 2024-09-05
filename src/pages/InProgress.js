import { useState, useEffect } from 'react';
import useFetch from "../useFetch.js";
import axios from 'axios';
import TaskList from '../TaskList.js';

const InProgress = () => {
    const { error, isPending, data: initialTasks } = useFetch('http://localhost:8000/tasks');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (initialTasks) {
            setTasks(initialTasks);
        }
    }, [initialTasks]);

    // Filter tasks to only include those with "in-progress" stage
    const inProgressTasks = tasks.filter(task => task.stage.trim().toLowerCase() === 'in-progress');

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:8000/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId)); 
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
        <div className="in-progress-page">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <TaskList 
                tasks={inProgressTasks} 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                handleAdd={handleAdd} 
                pageType="In-Progress" 
            /> 
        </div>
    );
}

export default InProgress;
