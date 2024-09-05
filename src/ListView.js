import './ListView.css';
import { useState } from 'react';
import TaskDetailsModal from './Modals/TaskDetailsModal';

const ListView = ({ tasks, handleDelete, handleEdit }) => {

  const [selectedTask, setSelectedTask] = useState(null);

  const closeModal = () => {
    setSelectedTask(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDetails = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    setSelectedTask(task);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Priority</th>
            <th>Create Date</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="task-title">
                <span className={`stage ${task.stage}`}></span>
                {task.title}
              </td>
              <td className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()} Priority
              </td>
              <td>{formatDate(task.created_at)}</td>
              <td>{formatDate(task.date)}</td>
              <td className="actions">
                <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                <button className="details-button" onClick={() => handleDetails(task.id)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <TaskDetailsModal 
          task={selectedTask} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default ListView;
