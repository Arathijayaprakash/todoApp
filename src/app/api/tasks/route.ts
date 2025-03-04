import { task } from "@/app/createTask/types";
import { NextResponse } from "next/server";

let tasks: task[] = [];

//get
export async function GET() {
  return NextResponse.json(tasks);
}

//post

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const newTask = { id: Date.now(), name };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

//delete

export async function DELETE(req: Request) {
  const { id } = await req.json();
  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json(
    { message: "Task deleted successfully" },
    { status: 200 }
  );
}

//put

export async function PUT(req: Request) {
  const { id, name } = await req.json();
  if (!name) {
    return NextResponse.json(
      { error: "Id and name are required" },
      { status: 400 }
    );
  }
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks[taskIndex].name = name;
  return NextResponse.json(
    { message: "Task updated successfully", task: tasks[taskIndex] },
    { status: 200 }
  );
}
