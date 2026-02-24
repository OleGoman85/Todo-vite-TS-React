import { useTodosContext } from '../context/useTodosContext'
export type FilterValue = 'all' | 'active' | 'completed'

function TodoFilters() {
	const { filter, setFilter } = useTodosContext()

	const base = `px-3 py-2
				rounded-md
				border
				border-slate-600
				transition
				duration-200`

	const getActiveClass = (v: FilterValue) => {
		if (v === 'all') {
			return `bg-slate-900 
	  			text-white 
				border-slate-900`
		}
		if (v === 'active') {
			return `bg-green-600 
	  			text-white 
				border-green-600`
		}
		if (v === 'completed') {
			return `bg-blue-600 
	  			text-white 
				border-blue-600`
		}
	}

	const getClass = (v: FilterValue) =>
		`${base} ${filter === v
			? getActiveClass(v)
			: 'bg-white text-slate-900 hover:bg-slate-200'
		}`

	return (
		<div
			className="flex
				gap-2"
		>
			<button
				type="button"
				className={getClass('all')}
				onClick={() => setFilter('all')}
			>
				All
			</button>

			<button
				type="button"
				className={getClass('active')}
				onClick={() => setFilter('active')}
			>
				Active
			</button>

			<button
				type="button"
				className={getClass('completed')}
				onClick={() => setFilter('completed')}
			>
				Completed
			</button>
		</div>
	)
}

export default TodoFilters
