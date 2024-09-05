import { useState, useEffect } from 'react';
import useFetch from "../useFetch.js";
import axios from 'axios';
import TaskList from "../TaskList.js";

const Tasks = () => {
    const { error, isPending, data: initialTasks } = useFetch('http://localhost:8000/tasks');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (initialTasks) {
            setTasks(initialTasks);
        }
    }, [initialTasks]);
    
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
        <div className="page-content">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            <TaskList 
                tasks={tasks}
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
                handleAdd={handleAdd}
                pageType="All Tasks" 
            /> 
        </div>
    );
}

export default Tasks;
