import './TaskList.css';
import { useState } from "react";
import ListView from './ListView';
import BoardView from './BoardView';
import EditTaskForm from './Modals/EditTaskForm'; 
import Modal from './Modals/AddTaskForm';
import { BsFillGridFill } from "react-icons/bs";
import { PiListBold } from "react-icons/pi";


const TaskList = ({ tasks, searchQuery = '', handleDelete, handleEdit, handleAdd, pageType}) => { 
  const [view, setView] = useState(localStorage.getItem('view') || 'list');
  const [editingTaskId, setEditingTaskId] = useState(null); 

  const toggleView = () => {
    localStorage.setItem('view', view === 'list' ? 'board' : 'list');
    setView(view === 'list' ? 'board' : 'list');
  };

  const filteredTasks = tasks.filter(task =>
    task && 
    (
      (task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.priority.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.stage.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="task-list">
      <h1>{pageType}</h1>
      <div className="view-switch-create-task">
      <button onClick={toggleView} className="view-toggle-button"> {view === 'list' ? (
    <>
      <BsFillGridFill className='board-icon' viewBox='0 0 20 11' /> Board View
    </>
  ) : (
    <>
      <PiListBold className='list-icon' viewBox='20 0 256 190' /> List View
    </>
  )}
</button>
        <Modal onAdd={handleAdd} pageType={pageType.toLowerCase()} />
        </div>

      {view === 'list' ? (
        <ListView tasks={filteredTasks} handleDelete={handleDelete} handleEdit={setEditingTaskId} />
      ) : (
        <BoardView tasks={filteredTasks} handleDelete={handleDelete} handleEdit={setEditingTaskId} />
      )}

      {editingTaskId && (
        <EditTaskForm taskId={editingTaskId} onEdit={(updatedTask) => {
            handleEdit(updatedTask);
            setEditingTaskId(null);
          }} 
          onClose={() => setEditingTaskId(null)} 
        />
      )}
    </div>
  );
}

export default TaskList;
