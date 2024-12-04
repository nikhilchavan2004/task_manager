import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTaskCompleted, updateTask } from '../store/taskSlice';

const TaskCard = ({
    id,
    title,
    description,
    startDate,
    endDate,
    status,
    assignee,
    priority,
    completed
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        title,
        description,
        startDate,
        endDate,
        status,
        priority,
        assignee
    });
    
    const dispatch = useDispatch();

    const getDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    const getColors = (type, value) => {
        const colors = {
            priority: {
                p1: "bg-red-100 text-red-700 border-red-200",
                p2: "bg-orange-100 text-orange-700 border-orange-200",
                p3: "bg-blue-100 text-blue-700 border-blue-200"
            },
            status: {
                completed: "bg-green-100 text-green-700 border-green-200",
                "in progress": "bg-blue-100 text-blue-700 border-blue-200",
                pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
                deferred: "bg-gray-100 text-gray-700 border-gray-200"
            }
        };
        return colors[type][value?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        dispatch(updateTask({ id, ...editData, status: completed ? "Completed" : editData.status }));
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="h-72 w-64 rounded-xl bg-white p-5 shadow-lg transition-shadow">
                <form onSubmit={handleSubmitEdit} className="space-y-3">
                    <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full rounded-lg border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Title"
                        required
                    />
                    
                    <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        className="w-full rounded-lg border px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={2}
                        placeholder="Description"
                        required
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={editData.status}
                            onChange={(e) => setEditData({...editData, status: e.target.value})}
                            className="rounded-lg border px-2 py-1.5 text-sm"
                            required
                        >
                            {["Pending", "In Progress", "Completed", "Deferred"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>

                        <select
                            value={editData.priority}
                            onChange={(e) => setEditData({...editData, priority: e.target.value})}
                            className="rounded-lg border px-2 py-1.5 text-sm"
                            required
                        >
                            {["P1", "P2", "P3"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="text"
                        value={editData.assignee}
                        onChange={(e) => setEditData({...editData, assignee: e.target.value})}
                        className="w-full rounded-lg border px-3 py-1.5 text-sm"
                        placeholder="Assignee"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="group h-72 w-64 rounded-xl bg-white p-5 shadow-lg transition-all duration-200 hover:shadow-xl">
            <div className="mb-4 flex items-start justify-between">
                <span className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${getColors('priority', priority)}`}>
                    {priority}
                </span>
                <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button 
                        onClick={() => setIsEditing(true)} 
                        className="rounded-lg p-1.5 hover:bg-gray-100"
                        title="Edit task"
                    >
                        ✏️
                    </button>
                    <button 
                        onClick={() => dispatch(removeTask(id))} 
                        className="rounded-lg p-1.5 hover:bg-red-50"
                        title="Delete task"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mb-4 h-16 overflow-hidden text-sm text-gray-600">{description}</p>

            <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                <div>
                    <p className="font-medium text-gray-500">Start</p>
                    <p className="text-gray-900">{startDate ? new Date(startDate).toLocaleDateString() : 'Not set'}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-500">Due</p>
                    <p className="text-gray-900">{endDate ? new Date(endDate).toLocaleDateString() : 'Not set'}</p>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">👤 {assignee || 'Unassigned'}</span>
                <button
                    onClick={() => dispatch(toggleTaskCompleted(id))}
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getColors('status', status)}`}
                >
                    {status}
                </button>
            </div>
        </div>
    );
};

TaskCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    status: PropTypes.string.isRequired,
    assignee: PropTypes.string,
    priority: PropTypes.string,
    completed: PropTypes.bool
};

export default TaskCard;