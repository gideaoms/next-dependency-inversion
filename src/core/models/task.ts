export type Status = 'pending' | 'done'

export type Model = {
  readonly id: string,
  readonly description: string,
  readonly status: Status
}

export function isDone(model: Model) {
  return model.status === 'done'
}

export function updateStatus(model: Model, status: Status) {
  return build({ ...model, status })
}

export function build(model: Partial<Model>) {
  const id = model.id ?? ''
  const description = model.description ?? ''
  const status = model.status ?? 'pending'
  return { id, description, status } satisfies Model
}