import { SetStateAction } from "react";

export interface AddTasksProps {
  setTasks: React.Dispatch<SetStateAction<Array<task>>>;
}
export type task = {
  name: string;
  id: number;
};