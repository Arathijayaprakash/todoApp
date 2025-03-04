import { SetStateAction, useState } from "react";
import { task } from "../createTask/types";
import "../styles.css";
import "../createTask/styles.css";
import { useDispatch } from "react-redux";
import { updateTasks } from "../createTask/taskSlice";
import toast from "react-hot-toast";

const TaskItem = ({
  isEditing,
  task,
  editHandler,
  setTaskName,
  deleteTasks,
  editId,
  setUpdating,
  setIsEditing,
}: {
  isEditing: boolean;
  task: task;
  editHandler: (id: number) => void;
  setTaskName: React.Dispatch<SetStateAction<string>>;
  deleteTasks: (id: number) => void;
  editId: number;
  setUpdating: React.Dispatch<SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const [taskInput, setTaskInput] = useState<string>(task.name);
  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const saveEditHandler = async (id: number) => {
    try {
      const response = await fetch("api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, name: taskInput }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      dispatch(updateTasks({ id: id, name: taskInput }));
      setUpdating((prev) => !prev);
      setIsEditing(false);
      setTaskName("");
      toast.success("Task Updated Successfully");
    } catch (error) {
      console.log("Error while updating", error);
      toast.error("Failed to Updated Task");
    }
  };
  return (
    <li className="task-item">
      {isEditing && editId === task.id ? (
        <input
          className="edit-task-input"
          type="text"
          value={taskInput}
          onChange={handleTaskInputChange}
        />
      ) : (
        task.name
      )}

      <div>
        {isEditing && editId === task.id ? (
          <button
            onClick={() => saveEditHandler(task.id)}
            className="edit-button"
          >
            Save
          </button>
        ) : (
          <button onClick={() => editHandler(task.id)} className="edit-button">
            Edit
          </button>
        )}

        <button className="delete-button" onClick={() => deleteTasks(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};
export default TaskItem;
