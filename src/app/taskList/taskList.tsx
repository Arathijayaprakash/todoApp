import { SetStateAction, useState } from "react";
import { task } from "../createTask/types";
import TaskItem from "./taskItem";

import "../styles.css";

const TaskList = ({
  taskList,
  deleteTasks,
  setTaskName,
  setUpdating,
}: {
  taskList: task[];
  deleteTasks: (id: number) => void;
  setTaskName: React.Dispatch<SetStateAction<string>>;
  setUpdating: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);

  const editHandler = (id: number) => {
    setIsEditing(true);
    setEditId(id);
  };
  return (
    <div>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <ul className="task-list" key={task.id}>
            <TaskItem
              task={task}
              isEditing={isEditing}
              editHandler={editHandler}
              deleteTasks={deleteTasks}
              setTaskName={setTaskName}
              editId={editId}
              setUpdating={setUpdating}
              setIsEditing={setIsEditing}
            />
          </ul>
        ))
      ) : (
        <h4>Please Add a Task</h4>
      )}
    </div>
  );
};

export default TaskList;
