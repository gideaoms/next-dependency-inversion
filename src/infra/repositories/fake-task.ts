import * as TaskRepository from "@/core/repositories/task";
import * as TaskModel from "@/core/models/task";

export class FakeTaskRepository implements TaskRepository.Repository {
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