
const ListView = ({ tasks, handleDelete , handleEdit}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Title</th>
          <th>Priority</th>
          <th>Created At</th>
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
            <td>{task.date}</td>
            <td className="actions">
            <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListView;
