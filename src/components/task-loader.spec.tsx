import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TaskLoader } from "./task-loader";
import * as TaskModel from "@/core/models/task";
import { RepositoriesContext } from "@/contexts/repositories";
import { FakeTaskRepository } from "@/infra/repositories/fake-task";

describe("TaskLoader", function () {
  it("should render a list of tasks", async function () {
    const repositories = { task: new FakeTaskRepository() };
    const task1 = TaskModel.build({
      id: "1",
      description: "Task 1",
      status: "pending",
    });
    const task2 = TaskModel.build({
      id: "2",
      description: "Task 2",
      status: "pending",
    });
    await repositories.task.create(task1);
    await repositories.task.create(task2);
    const result = await TaskLoader({ taskRepository: repositories.task });
    const { getByText } = render(
      <RepositoriesContext.Provider value={{ repositories }}>
        {result}
      </RepositoriesContext.Provider>
    );
    expect(getByText(task1.description)).toBeDefined();
    expect(getByText(task2.description)).toBeDefined();
  });
});
