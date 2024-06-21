import * as TaskRepository from '@/core/repositories/task'
import * as TaskModel from '@/core/models/task'
import { z } from 'zod'

export class Repository implements TaskRepository.Repository {
  async findMany() {
    const response = await fetch('http://localhost:3000/tasks', {
      next: { revalidate: 0 },
    })
    const json = await response.json()
    console.log(json)
    const tasks = z.array(z.object({
      id: z.string(),
      description: z.string(),
      status: z.enum(['pending', 'done'])
    })).parse(json)
    return tasks
  }

  async create(task: TaskModel.Model) {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
    const json = await response.json()
    const createdTask = z.object({
      id: z.string(),
      description: z.string(),
      status: z.enum(['pending', 'done'])
    }).parse(json)
    return TaskModel.build(createdTask)
  }

  async update(task: TaskModel.Model) {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
    const json = await response.json()
    const updatedTask = z.object({
      id: z.string(),
      description: z.string(),
      status: z.enum(['pending', 'done'])
    }).parse(json)
    return TaskModel.build(updatedTask)
  }
}