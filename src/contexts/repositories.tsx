"use client";

import { createContext, useContext } from "react";
import * as TaskRepository from "@/core/repositories/task";

export const RepositoriesContext = createContext<{
  repositories: { task: TaskRepository.Repository };
}>(null!);

export function useRepositories() {
  return useContext(RepositoriesContext);
}
