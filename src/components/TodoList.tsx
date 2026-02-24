import TodoItem from './TodoItem'
import { useTodosContext } from '../context/useTodosContext'

function TodoList() {
	const { visibleTodos } = useTodosContext()

	return (
		<>
			<div className="space-y-2">
				{visibleTodos.map((todo) => {
					return <TodoItem key={todo.id} todo={todo} />
				})}
			</div>

			{visibleTodos.length === 0 && (
				<p
					className="text-center
						text-m
						text-gray-500"
				>
					NO todos yet. Add a new one above
				</p>
			)}
		</>
	)
}

export default TodoList
