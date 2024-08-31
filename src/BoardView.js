// BoardView.js
import React from 'react';

const BoardView = ({ tasks = [], handleDelete }) => {
  return (
    <div className="board-view">
      {tasks.map((task) => (
        <div key={task.id} className="board-card">
          <h3>{task.title}</h3>
          <p>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()} Priority</p>
          <p>{task.date}</p>
          <div className="actions">
            <button>Edit</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BoardView;
