import { createContext } from 'react'
import type { Todo } from '../types/todo'
import type { FilterValue } from '../components/TodoFilters'

export type TodosContextValue = {
	todos: Todo[]
	filter: FilterValue
	visibleTodos: Todo[]
	setFilter: (value: FilterValue) => void
	addTodo: (title: string) => void
	handleTodoCompleted: (id: number, completed: boolean) => void
	deleteTodo: (id: number) => void
	deleteAllCompletedTodos: () => void
	updateTodoTitle: (id: number, title: string) => void
}

export const TodosContext = createContext<TodosContextValue | null>(null)
