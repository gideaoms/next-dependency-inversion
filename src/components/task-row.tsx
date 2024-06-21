"use client";

import classNames from "classnames";
import { useState } from "react";
import * as TaskModel from "@/core/models/task";
import { useRepositories } from "@/contexts/repositories";

export function TaskRow(props: { task: TaskModel.Model }) {
  const [task, setTask] = useState(props.task);
  const { repositories } = useRepositories();

  async function update(checked: boolean) {
    const status: TaskModel.Status = checked ? "done" : "pending";
    const taskWithNewStatus = TaskModel.updateStatus(task, status);
    const updatedTask = await repositories.task.update(taskWithNewStatus);
    setTask(updatedTask);
  }

  return (
    <li>
      <span
        className={classNames({
          "line-through": TaskModel.isDone(task),
        })}
      >
        {task.description}
      </span>
      <input
        type="checkbox"
        checked={TaskModel.isDone(task)}
        onChange={(ev) => update(ev.target.checked)}
      />
    </li>
  );
}
