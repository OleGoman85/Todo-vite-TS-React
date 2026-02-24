import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../types/todo'
import { Trash2 } from 'lucide-react'
import { useTodosContext } from '../context/useTodosContext'

type TodoItemProps = {
	todo: Todo
}

function TodoItem({ todo }: TodoItemProps) {
	const { handleTodoCompleted, deleteTodo, updateTodoTitle } = useTodosContext()

	const [isEditing, setIsEditing] = useState(false)
	const [draft, setDraft] = useState('')

	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (!isEditing) return
		inputRef.current?.focus()
		inputRef.current?.select()
	}, [isEditing])

	const startEditing = () => {
		setDraft(todo.title)
		setIsEditing(true)
	}

	const save = () => {
		const trimmed = draft.trim()
		if (!trimmed) {
			setIsEditing(false)
			return
		}
		updateTodoTitle(todo.id, trimmed)
		setIsEditing(false)
	}

	const cancel = () => {
		setDraft(todo.title)
		setIsEditing(false)
	}

	return (
		<div
			className="flex
				items-center
				gap-2
				border
				rounded-md
				p-2
				bg-white
				hover:bg-slate-50"
		>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={(e) => handleTodoCompleted(todo.id, e.target.checked)}
				className="scale-125
					shrink-0"
			/>

			<div
				className="flex
					items-center
					min-w-0
					flex-1"
			>
				{isEditing ? (
					<input
						ref={inputRef}
						value={draft}
						onChange={(e) => setDraft(e.target.value)}
						onBlur={save}
						onKeyDown={(e) => {
							if (e.key === 'Enter') save()
							if (e.key === 'Escape') cancel()
						}}
						className="w-full
							min-w-0
							border
							border-gray-300
							rounded
							px-2
							py-1
							bg-white
							focus:outline-none
							focus:ring-2
							focus:ring-slate-500"
					/>
				) : (
					<span
						onDoubleClick={startEditing}
						title="Double click to edit"
						className={`min-w-0
							overflow-hidden
							text-ellipsis
							whitespace-nowrap
							cursor-text
							${todo.completed ? 'line-through text-gray-400' : ''}`}
					>
						{todo.title}
					</span>
				)}
			</div>

			<button
				type="button"
				className="p-2
					hover:bg-slate-200
					rounded
					shrink-0"
				onClick={() => deleteTodo(todo.id)}
				aria-label="delete todo"
			>
				<Trash2 size={20} className="text-gray-600" />
			</button>
		</div>
	)
}

export default TodoItem
