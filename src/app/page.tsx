"use client";
import { useDispatch, useSelector } from "react-redux";
import AddTask from "./createTask/addTask";
import { task } from "./createTask/types";
import { RootState } from "./store";
import { useEffect, useState } from "react";
import { removeTasks, setTasks } from "./createTask/taskSlice";
import TaskList from "./taskList/taskList";
import "./styles.css";
import toast from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch();
  const tasks: Array<task> = useSelector(
    (state: RootState) => state.tasks.tasks
  );
  const [taskList, setTaskList] = useState<task[]>(tasks);
  const [taskName, setTaskName] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  const deleteTasks = async (id: number) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      dispatch(removeTasks(id));
      setUpdating((prev) => !prev);
      toast.success("Task Deleted Successfully");
    } catch (error) {
      console.log(error, "error while deleting the task");
      toast.error("Failed to delete Task");
    }
  };

  useEffect(() => {
    const getTasks: () => Promise<void> = async () => {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTasks(data));
          setTaskList(data);
        });
      if (taskList) {
        dispatch(setTasks(taskList));
      }
    };
    getTasks();
  }, [dispatch, taskList, updating]);

  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <h2 className="subtitle">Add Task</h2>
      <AddTask
        taskName={taskName}
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
      <TaskList
        taskList={taskList}
        deleteTasks={deleteTasks}
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
    </div>
  );
}
