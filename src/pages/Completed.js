import { useState, useEffect } from 'react';
import useFetch from "../useFetch.js";
import axios from 'axios';
import TaskList from '../TaskList.js';

const Completed = () => {
    const { error, isPending, data: initialTasks } = useFetch('http://localhost:8000/tasks');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (initialTasks) {
            setTasks(initialTasks);
        }
    }, [initialTasks]);

    // Filter tasks to only include those with "completed" stage
    const completedTasks = tasks.filter(task => task.stage.trim().toLowerCase() === 'completed');

    const handleDelete = (taskId) => {
        axios.delete('http://localhost:8000/tasks/' + taskId)
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
        <div className="completed-page">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <TaskList 
                tasks={completedTasks} 
                pageTitle="Completed Tasks" 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                handleAdd={handleAdd} 
                pageType="Completed" 
            /> 
        </div>
    );
}

export default Completed;
