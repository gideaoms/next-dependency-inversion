"use client";

import classNames from "classnames";
import { ITask } from "@/types/task";
import { useState } from "react";

export function TaskRow(props: { task: ITask }) {
  const [task, setTask] = useState(props.task);

  async function update(checked: boolean) {
    const updatedTask: ITask = {
      ...task,
      status: checked ? "done" : "pending",
    };
    const response = await fetch(
      `http://localhost:3000/tasks/${updatedTask.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "put",
        body: JSON.stringify(updatedTask),
      }
    );
    const json = await response.json();
    setTask(json);
  }

  return (
    <li>
      <span
        className={classNames({
          "line-through": task.status === "done",
        })}
      >
        {task.description}
      </span>
      <input
        type="checkbox"
        checked={task.status === "done"}
        onChange={(ev) => update(ev.target.checked)}
      />
    </li>
  );
}
