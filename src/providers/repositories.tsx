"use client";

import { RepositoriesContext } from "@/contexts/repositories";
import * as TaskRepository from "../infra/repositories/task";
import { ReactNode } from "react";

const repositories = {
  task: new TaskRepository.Repository(),
};

export function RepositoriesProvider(props: { children: ReactNode }) {
  return (
    <RepositoriesContext.Provider value={{ repositories }}>
      {props.children}
    </RepositoriesContext.Provider>
  );
}
