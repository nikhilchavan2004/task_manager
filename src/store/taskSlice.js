import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: nanoid(), // Use nanoid for unique IDs
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate || new Date().toISOString(),
        endDate: action.payload.endDate || null,
        status: action.payload.status || "Pending",
        assignee: action.payload.assignee || "",
        priority: action.payload.priority || "P2",
        completed: false
      };
      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    removeTask: (state, action) => {
      const updatedTasks = state.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    },
    toggleTaskCompleted: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.status = task.completed ? "Completed" : "Pending";
        task.endDate = task.completed ? new Date().toISOString() : null;
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.findIndex(task => task.id === id);
      
      if (taskIndex !== -1) {
        state[taskIndex] = {
          ...state[taskIndex],
          ...updates
        };
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
  },
});

export const { 
  addTask, 
  removeTask, 
  toggleTaskCompleted, 
  updateTask 
} = taskSlice.actions;

export default taskSlice.reducer;

export const selectAllTasks = (state) => state.tasks;