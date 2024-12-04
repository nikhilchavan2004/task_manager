import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, selectAllTasks } from '../store/taskSlice';
import Task from './Task';

const TaskList = () => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'P2'
  });
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask(newTask));
    setNewTask({
      title: '',
      description: '',
      status: 'Pending',
      priority: 'P2'
    });
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleAddTask} className="mb-6 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Task Title"
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="P0">High Priority</option>
            <option value="P1">Medium Priority</option>
            <option value="P2">Low Priority</option>
          </select>
        </div>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
          placeholder="Task Description"
          className="w-full p-2 border rounded mt-4"
        />
        <button 
          type="submit" 
          className="mt-4 w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Add Task
        </button>
      </form>

      <div>
        {tasks.map(task => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;