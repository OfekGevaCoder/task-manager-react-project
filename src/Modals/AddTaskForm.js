import { useState } from 'react';
import './AddTaskModal.css';

const Modal = ({ onAdd }) => {

    const [title, setTitle] = useState('');
    const [stage, setStage] = useState('todo');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('normal');
    const [body, setBody] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
         // Reset form values when closing the modal
        setTitle('');
        setStage('todo');
        setDate('');
        setPriority('normal');
        setBody('');                        
        setModal(!modal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = { title, stage, date, priority, body };

        fetch('http://localhost:8000/tasks/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask)
        }).then(response => response.json())
          .then((createdTask) => {
            onAdd(createdTask); // Add the new task to the TaskList
            setModal(false);  // Close the modal after submit
          })
          .catch(error => {
            console.error("Error adding task:", error);
          });
    };

    return(
        <>
        <button onClick={toggleModal} className='btn-modal'>
            Add Task
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
                            value={stage}
                            onChange={(e) => setStage(e.target.value)}
                        >
                            <option value="todo">TODO</option>
                            <option value="in-progress">IN PROGRESS</option>
                            <option value="completed">COMPLETED</option>
                        </select>
                        <label>due date:</label>
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
