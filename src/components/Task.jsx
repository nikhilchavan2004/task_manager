import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleTaskCompleted, removeTask, updateTask } from '../store/taskSlice';
import { FaClock, FaUserAlt, FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800", 
  "Completed": "bg-green-100 text-green-800",
  "Deployed": "bg-purple-100 text-purple-800",
  "Deferred": "bg-gray-100 text-gray-800"
};

const priorityColors = {
  "P0": "bg-red-200 text-red-900",
  "P1": "bg-orange-200 text-orange-900",
  "P2": "bg-green-200 text-green-900"
};

const Task = ({ 
  id, 
  title, 
  completed, 
  description, 
  startDate, 
  endDate, 
  status, 
  assignee, 
  priority 
}) => {
  console.log({ id, title, completed, description, status, priority });


  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the task: "${title}"?`)) {
      dispatch(removeTask(id));
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedTask = {
      id,
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
      assignee: formData.get('assignee'),
      priority: formData.get('priority')
    };

    dispatch(updateTask(updatedTask));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-4 border-2 border-indigo-200">
        <form onSubmit={handleEdit} className="space-y-4">
          <input 
            name="title" 
            defaultValue={title} 
            className="w-full p-3 border-2 border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-300" 
            placeholder="Task Title"
            required 
          />
          <textarea 
            name="description" 
            defaultValue={description} 
            className="w-full p-3 border-2 border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-300" 
            placeholder="Task Description"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <select 
              name="status" 
              defaultValue={status} 
              className="p-3 border-2 border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-300"
            >
              {Object.keys(statusColors).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <input 
              name="assignee" 
              defaultValue={assignee} 
              className="p-3 border-2 border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-300" 
              placeholder="Assignee" 
            />
            <select 
              name="priority" 
              defaultValue={priority} 
              className="p-3 border-2 border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-300"
            >
              {Object.keys(priorityColors).map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 mb-4 border ${completed ? 'opacity-75 border-gray-200' : 'border-indigo-100'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleTaskCompleted(id))} 
            className="w-6 h-6 rounded border-gray-300 focus:ring-2 focus:ring-indigo-300" 
          />
          <h3 className={`text-lg font-bold ${completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {title}
          </h3>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsEditing(true)} 
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          aria-label="Edit Task"
        >
          <FaEdit className="inline-block mr-2" /> Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          aria-label="Delete Task"
        >
          <FaTrash className="inline-block mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  status: PropTypes.string.isRequired,
  assignee: PropTypes.string,
  priority: PropTypes.string.isRequired,
};

export default Task;
