import { useState } from 'react'
import { useTodosContext } from '../context/useTodosContext'

function AddTodoForm() {
	const { addTodo } = useTodosContext()
	const [input, setInput] = useState('')

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!input.trim()) return
		addTodo(input)
		setInput('')
	}

	return (
		<form className="flex" onSubmit={handleSubmit}>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="What needs to be done?"
				className="rounded-s-md
					grow
					border
					border-gray-400
					p-2
					bg-white"
			/>
			<button
				type="submit"
				className="w-16
					rounded-e-md
					bg-slate-900
					text-white
					hover:bg-green-600"
			>
				Add
			</button>
		</form>
	)
}

export default AddTodoForm
