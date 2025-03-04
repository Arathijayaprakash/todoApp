import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { task } from "./types";

interface TaskState {
  tasks: task[];
}
const initialState: TaskState = { tasks: [] };
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks(state, action: PayloadAction<{ name: string; id: number }>) {
      const newTask: task = {
        name: action.payload.name,
        id: action.payload.id,
      };
      state.tasks.push(newTask);
    },
    setTasks(state, action: PayloadAction<task[]>) {
      state.tasks = action.payload;
    },
    removeTasks(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTasks(state, action: PayloadAction<{ name: string; id: number }>) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id == action.payload.id
      );
      state.tasks[taskIndex].name = action.payload.name;
    },
  },
});

export const { addTasks, setTasks, removeTasks, updateTasks } =
  taskSlice.actions;
export default taskSlice.reducer;
