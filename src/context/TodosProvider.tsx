import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Todo } from '../types/todo'
import { exampleData } from '../data/todos'
import type { FilterValue } from '../components/TodoFilters'
import { TodosContext, type TodosContextValue } from './TodosContext'

type Props = {
	children: ReactNode
}

function TodosProvider({ children }: Props) {
	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
		return savedTodos.length > 0 ? savedTodos : exampleData
	})

	const [filter, setFilter] = useState<FilterValue>('all')

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	const handleTodoCompleted = (id: number, completed: boolean) => {
		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
		)
	}

	const addTodo = (title: string) => {
		const trimmed = title.trim()
		if (!trimmed) return

		setTodos((prev) => [
			{
				id: Date.now(),
				title: trimmed,
				completed: false,
			},
			...prev,
		])
	}

	const deleteTodo = (id: number) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id))
	}

	const deleteAllCompletedTodos = () => {
		setTodos((prev) => prev.filter((todo) => !todo.completed))
	}

	const updateTodoTitle = (id: number, title: string) => {
		const trimmed = title.trim()
		if (!trimmed) return

		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)),
		)
	}

	const visibleTodos = useMemo(() => {
		const filtered =
			filter === 'active'
				? todos.filter((t) => !t.completed)
				: filter === 'completed'
					? todos.filter((t) => t.completed)
					: todos

		return [...filtered].sort((a, b) => {
			if (a.completed === b.completed) return b.id - a.id
			return a.completed ? 1 : -1
		})
	}, [todos, filter])

	const value: TodosContextValue = {
		todos,
		filter,
		visibleTodos,
		setFilter,
		addTodo,
		handleTodoCompleted,
		deleteTodo,
		deleteAllCompletedTodos,
		updateTodoTitle,
	}

	return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
export default TodosProvider
