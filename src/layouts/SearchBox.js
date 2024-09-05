import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import TaskDetailsModal from '../Modals/TaskDetailsModal';
import './SearchBox.css';

const SearchBox = ({ tasks = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredTasks);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, tasks]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectTask = (task) => {
    setSelectedTask(task); // Open the modal with the selected task's details
    setSearchQuery(''); // Clear the search box after selection
    setSuggestions([]); // Clear suggestions
  };

  const closeModal = () => {
    setSelectedTask(null); // Close the modal
  };

  return (
    <div className="search-box">
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search tasks..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((task) => (
            <li key={task.id} onClick={() => handleSelectTask(task)}>
              {task.title}
            </li>
          ))}
        </ul>
      )}

      {/* Trigger the TaskDetailsModal when a task is selected */}
      {selectedTask && (
        <TaskDetailsModal task={selectedTask} onClose={closeModal} />
      )}
    </div>
  );
};

export default SearchBox;
