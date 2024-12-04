import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GrTask, GrInProgress } from "react-icons/gr";
import { MdDashboard, MdOutlineTaskAlt, MdAddTask, MdPendingActions, MdCloudDone, 
  MdOutlineAccessTimeFilled, MdQueryStats, MdEdit, MdDelete } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState(null);

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch({ type: 'tasks/deleteTask', payload: taskId });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (taskId, updatedData) => {
    dispatch({ 
      type: 'tasks/updateTask', 
      payload: { id: taskId, ...updatedData } 
    });
    setEditingTask(null);
  };

  const ActionButton = ({ task }) => (
    <div className="flex gap-2 ml-auto">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleEditTask(task);
        }}
        className="p-1 text-teal-100 hover:text-white transition-colors"
      >
        <MdEdit size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleDeleteTask(task.id);
        }}
        className="p-1 text-teal-100 hover:text-red-400 transition-colors"
      >
        <MdDelete size={18} />
      </button>
    </div>
  );

  const EditTaskModal = () => editingTask && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleSaveEdit(editingTask.id, {
            title: formData.get('title'),
            description: formData.get('description'),
            status: formData.get('status')
          });
        }}>
          <input
            name="title"
            defaultValue={editingTask.title}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            defaultValue={editingTask.description}
            className="w-full mb-3 p-2 border rounded"
            placeholder="Description"
          />
          <select
            name="status"
            defaultValue={editingTask.status}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deployed">Deployed</option>
            <option value="Deferred">Deferred</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingTask(null)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const isActiveRoute = (path) => {
    return location.pathname === path ? 'bg-teal-600' : '';
  };

  const menuItems = [
    { path: '/', icon: <MdDashboard />, label: 'Dashboard' },
    { path: '/completeTask', icon: <MdOutlineTaskAlt />, label: 'Completed Tasks' },
    { path: '/pendingTask', icon: <MdPendingActions />, label: 'Pending Tasks' },
    { path: '/inProgressTask', icon: <GrInProgress />, label: 'In Progress Tasks' },
    { path: '/deployedTask', icon: <MdCloudDone />, label: 'Deployed Tasks' },
    { path: '/deferredTask', icon: <MdOutlineAccessTimeFilled />, label: 'Deferred Tasks' },
    { path: '/addTask', icon: <MdAddTask />, label: 'Add New Tasks' },
    { path: '/statsTask', icon: <MdQueryStats />, label: 'Task Stats' }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-red-400 to-violet-900 min-h-screen w-[5rem] sm:w-[19rem] flex flex-col shadow-xl">
        <div className="flex items-center gap-3 justify-center h-20 text-white border-b border-teal-400/30">
          <GrTask className="text-2xl" />
          <h1 className="sm:block hidden text-2xl font-bold tracking-wide">
            Task Manager
          </h1>
        </div>
        
        <nav className="mt-6 flex-1">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-teal-50 rounded-lg transition-all duration-200 hover:bg-teal-600 hover:shadow-lg ${isActiveRoute(item.path)}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="sm:block hidden font-medium">
                    {item.label}
                  </span>
                  {item.tasks && <ActionButton task={item} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <EditTaskModal />
    </>
  );
}