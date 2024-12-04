import React, { useState } from "react";

const Dashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, label: "TOTAL TASK", total: 50, description: "Overview of all tasks" },
        { id: 2, label: "COMPLETED TASK", total: 25, description: "Tasks successfully completed" },
        { id: 3, label: "TASK IN PROGRESS", total: 15, description: "Currently ongoing tasks" },
        { id: 4, label: "PENDING", total: 10, description: "Tasks pending for approval" },
    ]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({});

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditedTask(task);
    };

    const handleSaveClick = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === editingTaskId
                    ? { ...task, label: editedTask.label, total: editedTask.total, description: editedTask.description }
                    : task
            )
        );
        setEditingTaskId(null);
        setEditedTask({});
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        }
    };

    return (
        <div className="mx-auto w-[80%]">
            <h1 className="text-3xl font-bold my-8 text-center">Tasks Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <div key={task.id} className="p-5 bg-white shadow-md rounded-md">
                        {editingTaskId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTask.label}
                                    onChange={(e) => setEditedTask({ ...editedTask, label: e.target.value })}
                                    className="border p-2 w-full mb-2 rounded"
                                    placeholder="Edit task label"
                                />
                                <input
                                    type="number"
                                    value={editedTask.total}
                                    onChange={(e) => setEditedTask({ ...editedTask, total: Number(e.target.value) })}
                                    className="border p-2 w-full mb-2 rounded"
                                    placeholder="Edit task total"
                                />
                                <textarea
                                    value={editedTask.description}
                                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                    className="border p-2 w-full mb-2 rounded"
                                    placeholder="Edit task description"
                                />
                                <button
                                    onClick={handleSaveClick}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingTaskId(null)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold">{task.label}</h3>
                                <p className="text-sm text-gray-500">Count: {task.total}</p>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => handleEditClick(task)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
