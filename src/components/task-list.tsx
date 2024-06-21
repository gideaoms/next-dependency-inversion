"use client";

import { TaskForm } from "@/components/task-form";
import { TaskRow } from "@/components/task-row";
import { ITask } from "@/types/task";
import { useState } from "react";

export function TaskList(props: { tasks: ITask[] }) {
  const [tasks, setTasks] = useState(props.tasks);

  async function create(description: string) {
    const task: ITask = {
      id: undefined!,
      description,
      status: "pending",
    };
    const response = await fetch("http://localhost:3000/tasks", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(task),
    });
    const json = await response.json();
    setTasks((prev) => [...prev, json]);
  }

  return (
    <div>
      <TaskForm onSubmit={create} />
      <ul>
        {tasks.map((task: ITask) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
