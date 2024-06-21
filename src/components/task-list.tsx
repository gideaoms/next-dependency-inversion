"use client";

import { TaskForm } from "@/components/task-form";
import { TaskRow } from "@/components/task-row";
import { useState } from "react";
import * as TaskModel from "../core/models/task";
import { useRepositories } from "@/contexts/repositories";

export function TaskList(props: { tasks: TaskModel.Model[] }) {
  const [tasks, setTasks] = useState(props.tasks);
  const { repositories } = useRepositories();

  async function create(description: string) {
    const task = TaskModel.build({ id: String(tasks.length + 1), description });
    const createdTask = await repositories.task.create(task);
    setTasks((tasks) => [...tasks, createdTask]);
  }

  return (
    <div>
      <TaskForm onSubmit={create} />
      <ul>
        {tasks.map((task) => (
          <TaskRow key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
