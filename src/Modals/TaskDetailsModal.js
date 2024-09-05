import { useState } from 'react';
import './TaskDetailsModal.css';

const TaskDetailsModal = ({ task, onClose }) => {
    const [modal, setModal] = useState(true);

    const toggleModal = () => {
        setModal(!modal);
        onClose(); // Close the modal after toggling
    };

    return (
        <>
            {modal && (
                <div className='modal-wrapper'>
                    <div onClick={toggleModal} className='details-overlay'></div>
                    <div className='modal-details'>
                        <h2>Task Details</h2>
                        <div className='task-detail'>
                            <span className='label'>Title:</span> {task.title}
                        </div>
                        <div className='task-detail'>
                            <span className='label'>Stage:</span> {task.stage}
                        </div>
                        <div className='task-detail'>
                            <span className='label'>Created At:</span> {new Date(task.created_at).toLocaleDateString()}
                        </div>
                        <div className='task-detail'>
                            <span className='label'>Due Date:</span> {new Date(task.date).toLocaleDateString()}
                        </div>
                        <div className='task-detail'>
                            <span className='label'>Priority:</span> {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </div>
                        <div className='task-detail'>
                            <span className='label'>Body:</span> {task.body}
                        </div>
                        <button className='close-details-modal' onClick={toggleModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskDetailsModal;
