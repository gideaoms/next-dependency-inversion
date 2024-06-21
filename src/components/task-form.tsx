"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z.string().min(1),
});

export function TaskForm(props: { onSubmit: (description: string) => void }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(({ description }) => {
        props.onSubmit(description);
        form.reset();
      })}
    >
      <div>
        <input type="text" {...form.register("description")} />
        {form.formState.errors.description && (
          <span className="red">
            {form.formState.errors.description.message}
          </span>
        )}
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
