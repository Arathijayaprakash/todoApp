import toast from "react-hot-toast";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddTask from "@/app/createTask/addTask";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));
describe("Add Task Component", () => {
  const setTaskName = jest.fn();
  const setUpdating = jest.fn();
  it("Render Component correctly", () => {
    render(
      <AddTask
        taskName=""
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
    );
    expect(screen.getByPlaceholderText("Enter task name")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
  it("Will show error when clicking on add button without giving task", async () => {
    render(
      <AddTask
        taskName=""
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
    );
    fireEvent.submit(screen.getByRole("button", { name: /add/i }));
    expect(screen.getByText("Please enter a task name"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Please enter a task");
    });
  });
  it("submit task successfully and clears input", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    ) as jest.Mock;
    render(
      <AddTask
        taskName="New Task"
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
    );
    fireEvent.submit(screen.getByRole("button", { name: /add/i }));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/tasks", expect.any(Object));
      expect(setUpdating).toHaveBeenCalled();
      expect(setTaskName).toHaveBeenCalledWith("");
      expect(toast.success).toHaveBeenCalledWith("Task Added Successfully");
    });
  });
  it("show error toast when api fails", async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;
    render(
      <AddTask
        taskName="New Task"
        setTaskName={setTaskName}
        setUpdating={setUpdating}
      />
    );
    fireEvent.submit(screen.getByRole("button", { name: /add/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error: Failed to add task");
    });
  });
});
