import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";
import './AddTaskForm.css';

const Modal = ({ onAdd, pageType }) => {
    const [title, setTitle] = useState('');
    const [stage, setStage] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('normal');
    const [body, setBody] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        // Set default stage based on the pageType
        switch(pageType) {
            case 'tasks':
                setStage('todo');
                break;
            case 'in-progress':
                setStage('in-progress');
                break;
            case 'completed':
                setStage('completed');
                break;
            case 'todo':
                setStage('todo');
                break;
            default:
                setStage('todo'); // Default fallback
        }
    }, [pageType]);

    const toggleModal = () => {
        // Reset form values when closing the modal
        setTitle('');
        setStage(pageType === 'tasks' ? 'todo' : stage);
        setDate('');
        setPriority('normal');
        setBody('');
        setModal(!modal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const createdAt = new Date().toLocaleDateString(); // Use locale date string for created_at
        const newTask = { title, stage, created_at: createdAt, date, priority, body };

        axios.post('http://localhost:8000/tasks/', newTask)
            .then(response => {
                onAdd(response.data); // Add the new task to the TaskList
                setModal(false); // Close the modal after submit
            })
            .catch(error => {
                console.error("Error adding task:", error);
            });
    };

    return (
        <>
            <button onClick={toggleModal} className='btn-modal'>
            <FaPlus viewBox="-50 -10 600 360" /> Create Task
            </button>
            {modal && (
                <div className='modal'>
                    <div onClick={toggleModal} className='overlay'></div>
                    <div className='modal-content'>
                        <h2>Add Task</h2>
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
                                required
                                value={stage}
                                onChange={(e) => setStage(e.target.value)}
                                disabled={pageType === 'todo' || pageType === 'in-progress' || pageType === 'completed'}
                            >
                                <option value="todo">TODO</option>
                                <option value="in-progress">IN PROGRESS</option>
                                <option value="completed">COMPLETED</option>
                            </select>
                            <label>Due Date:</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <label>Priority Level:</label>
                            <select
                                required
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
                            <button className='submit-modal'>Submit Task</button>
                            <button className='close-modal' onClick={toggleModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
