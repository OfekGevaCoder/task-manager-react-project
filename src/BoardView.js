import './BoardView.css';
import { useState } from 'react';
import TaskDetailsModal from './Modals//TaskDetailsModal.js'; // Ensure you have this component

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const BoardView = ({ tasks = [], handleDelete, handleEdit }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="board-view">
      {tasks.map((task) => (
        <div key={task.id} className="board-card" onClick={() => handleCardClick(task)}>
          <h3>{task.title}</h3>
          <p>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()} Priority</p>
          <p>{formatDate(task.date)}</p>
          <div className="actions">
            <button onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event from firing
              handleEdit(task.id);
            }}>Edit</button>
            <button onClick={(e) => {
              e.stopPropagation(); // Prevent the card click event from firing
              handleDelete(task.id);
            }}>Delete</button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default BoardView;
