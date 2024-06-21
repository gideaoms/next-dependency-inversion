import { TaskLoader } from "@/components/task-loader";
import * as TaskRepository from "@/infra/repositories/task";

const taskRepository = new TaskRepository.Repository();

export default async function Page() {
  return <TaskLoader taskRepository={taskRepository} />;
}
