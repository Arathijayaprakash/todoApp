"use client";

import { SetStateAction, useState } from "react";

import "./styles.css";
import toast from "react-hot-toast";

const AddTask = ({
  taskName,
  setTaskName,
  setUpdating,
}: {
  taskName: string;
  setTaskName: React.Dispatch<SetStateAction<string>>;
  setUpdating: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const addTaskHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsError(taskName.length === 0);

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      setUpdating((prev) => !prev);
      setTaskName("");
      toast.success("Task Added Successfully");
    } catch (error) {
      if (!taskName) {
        toast.error("Please enter a task");
      } else {
        toast.error(`${error}`);
      }
    }
  };

  return (
    <>
      <form className="add-task-form" onSubmit={addTaskHandler}>
        <input
          className="task-input"
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        {isError && (
          <span className="error-message">Please enter a task name</span>
        )}
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default AddTask;
