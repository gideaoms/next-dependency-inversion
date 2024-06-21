import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TaskRow } from "./task-row";
import { RepositoriesContext } from "@/contexts/repositories";
import { FakeTaskRepository } from "@/infra/repositories/fake-task";
import * as TaskModel from "@/core/models/task";

describe("TaskRow", function () {
  it("should render a single task", function () {
    const repositories = { task: new FakeTaskRepository() };
    const task1 = TaskModel.build({
      id: "1",
      description: "Task 1",
      status: "pending",
    });
    const { getByText } = render(
      <RepositoriesContext.Provider value={{ repositories }}>
        <TaskRow task={task1} />
      </RepositoriesContext.Provider>
    );
    expect(getByText(task1.description)).toBeDefined();
  });
});
