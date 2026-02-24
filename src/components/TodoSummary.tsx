import { useTodosContext } from '../context/useTodosContext'

function TodoSummary() {
	const { todos, deleteAllCompletedTodos } = useTodosContext()

	const total = todos.length
	const completed = todos.filter((t) => t.completed).length
	const active = total - completed
	const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

	return (
		<div
			className="max-w-lg
				mx-auto
				bg-slate-200
				rounded-md
				p-4
				space-y-3"
		>
			<div
				className="flex
					items-center
					justify-between"
			>
				<div className="font-semibold">Summary</div>

				<button
					type="button"
					onClick={deleteAllCompletedTodos}
					disabled={completed === 0}
					className="px-3
						py-2
						rounded-md
						bg-slate-900
						text-white
						disabled:opacity-40
						disabled:cursor-not-allowed
						hover:bg-red-600"
				>
					Clear completed
				</button>
			</div>

			<div
				className="text-sm
					text-slate-700"
			>
				Total: <span className="font-semibold">{total}</span> • Active:{' '}
				<span className="font-semibold">{active}</span> • Completed:{' '}
				<span className="font-semibold">{completed}</span>
			</div>

			<div className="space-y-1">
				<div
					className="text-sm
						text-slate-700"
				>
					Progress: <span className="font-semibold">{percent}%</span>
				</div>

				<div
					className="w-full
						h-3
						bg-white
						rounded"
				>
					<div
						className="h-3
							rounded
							bg-green-600"
						style={{ width: `${percent}%` }}
					/>
				</div>
			</div>
		</div>
	)
}

export default TodoSummary
