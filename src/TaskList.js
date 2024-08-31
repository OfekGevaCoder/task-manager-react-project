// TaskList.js

import './TaskList.css';
import { useState, useEffect } from "react";
import ListView from './ListView';
import BoardView from './BoardView';
import EditTaskForm from './Modals/EditTaskForm'; 
import Modal from './Modals/AddTaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Local state for tasks
  const [view, setView] = useState('list'); // State to manage current view
  const [editingTaskId, setEditingTaskId] = useState(null); // State to manage the task being edited

  useEffect(() => {
    fetch('http://localhost:8000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleDelete = (taskId) => {
    fetch('http://localhost:8000/tasks/' + taskId, {
      method: 'DELETE'
    }).then(() => {
      setTasks(tasks.filter(task => task.id !== taskId)); // Update state immediately
    }).catch(err => {
      console.error('Failed to delete task:', err);
    });
  };

  const handleEdit = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTaskId(null); // Close the edit modal
  };

  const handleAdd = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleView = () => {
    setView(view === 'list' ? 'board' : 'list');
    localStorage.setItem('view','list');
  };

  return (
    <div className="task-list">
      <h1>Tasks</h1>
      <div className="view-switch">
        <button onClick={toggleView}>
          {view === 'list' ? 'Switch to Board View' : 'Switch to List View'}
        </button>
        <Modal onAdd={handleAdd} />
      </div>

      {view === 'list' ? (
        <ListView tasks={tasks} handleDelete={handleDelete} handleEdit={setEditingTaskId} />
      ) : (
        <BoardView tasks={tasks} handleDelete={handleDelete} handleEdit={setEditingTaskId} />
      )}

      {/* Render the EditTaskForm modal if a task is being edited */}
      {editingTaskId && (
        <EditTaskForm taskId={editingTaskId} onEdit={handleEdit} onClose={() => setEditingTaskId(null)} />
      )}
    </div>
  );
}

export default TaskList;
