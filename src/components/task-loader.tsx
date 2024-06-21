import { TaskList } from "@/components/task-list";
import * as TaskRepository from "../core/repositories/task";

export async function TaskLoader(props: {
  taskRepository: TaskRepository.Repository;
}) {
  const tasks = await props.taskRepository.findMany();
  return <TaskList tasks={tasks} />;
}
