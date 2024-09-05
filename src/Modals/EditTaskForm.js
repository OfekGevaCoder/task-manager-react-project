import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddTaskForm';

const EditTaskForm = ({ taskId, onEdit, onClose }) => {
    const [title, setTitle] = useState('');
    const [stage, setStage] = useState('todo');
    const [created_at, setCreated_at] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('normal');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (taskId) {
            axios.get(`http://localhost:8000/tasks/${taskId}`)
                .then(response => {
                    const data = response.data;
                    setTitle(data.title);
                    setStage(data.stage);
                    setCreated_at(data.created_at);
                    setDate(data.date);
                    setPriority(data.priority);
                    setBody(data.body);
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error fetching task data:", error);
                });
        }
    }, [taskId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = { id: taskId, title, stage, created_at,date, priority, body };

        fetch(`http://localhost:8000/tasks/${taskId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        }).then(() => {
            onEdit(updatedTask); // Pass updated task to TaskList
            onClose(); // Close the modal
        }).catch(error => {
            console.error("Error updating task:", error);
        });
    };

    return (
        <>
            <div className='modal'>
                <div onClick={onClose} className='overlay'></div>
                <div className='modal-content'>
                    <h2>Edit Task</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Task Title:</label>
                        <input 
                            type="text" 
                            required 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                        />
                        <label>Task Stage:</label>
                        <select
                            value={stage}
                            onChange={(e) => setStage(e.target.value)}
                        >
                            <option value="todo">TODO</option>
                            <option value="in-progress">IN PROGRESS</option>
                            <option value="completed">COMPLETED</option>
                        </select>
                        <label>Publish Date:</label>
                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <label>Priority Level:</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="normal">NORMAL</option>
                            <option value="high">HIGH</option>
                            <option value="low">LOW</option>
                        </select>
                        <label>Body:</label>
                        <input 
                            type="text"  
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Enter task content"
                        />
                        <button className='submit-modal'>Update Task</button>
                        <button className='close-modal' onClick={onClose}>Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditTaskForm;
