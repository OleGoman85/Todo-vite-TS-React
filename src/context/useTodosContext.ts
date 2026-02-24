import { useContext } from 'react'
import { TodosContext, type TodosContextValue } from './TodosContext.ts'

export function useTodosContext(): TodosContextValue {
	const ctx = useContext(TodosContext)
	if (!ctx) {
		throw new Error('useTodosContext must be used inside <TodosProvider />')
	}
	return ctx
}

