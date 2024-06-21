import * as TaskModel from '../models/task'

export type Repository = {
  findMany: () => Promise<TaskModel.Model[]>
  create: (task: TaskModel.Model) => Promise<TaskModel.Model>
  update: (task: TaskModel.Model) => Promise<TaskModel.Model>
}