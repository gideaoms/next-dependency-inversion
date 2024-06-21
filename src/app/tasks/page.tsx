import { TaskList } from "@/components/task-list";

export default async function Page() {
  const response = await fetch("http://localhost:3000/tasks");
  const tasks = await response.json();
  return <TaskList tasks={tasks} />;
}
