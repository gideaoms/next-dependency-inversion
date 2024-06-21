import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TaskLoader } from "./task-loader";
import * as TaskRepository from "@/core/repositories/task";
import * as TaskModel from "@/core/models/task";
import { RepositoriesProvider } from "@/providers/repositories";
import { RepositoriesContext } from "@/contexts/repositories";

class FakeTaskRepository implements TaskRepository.Repository {
  private tasks: TaskModel.Model[] = [];

  async findMany() {
    return this.tasks;
  }

  async create(task: TaskModel.Model) {
    this.tasks.push(task);
    return task;
  }

  async update(taskToUpdate: TaskModel.Model) {
    this.tasks = this.tasks.map((task) =>
      task.id === taskToUpdate.id ? taskToUpdate : task
    );
    return taskToUpdate;
  }
}

describe("TaskLoader", function () {
  it("should render a list of tasks", async function () {
    const repositories = { task: new FakeTaskRepository() };
    const task = TaskModel.build({
      id: "1",
      description: "Task 1",
      status: "pending",
    });
    await repositories.task.create(task);
    const result = await TaskLoader({ taskRepository: repositories.task });
    const { getByText, debug } = render(
      <RepositoriesContext.Provider value={{ repositories }}>
        {result}
      </RepositoriesContext.Provider>
    );
    expect(getByText(task.description)).toBeDefined();
  });
});
