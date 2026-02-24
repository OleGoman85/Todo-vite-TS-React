import AddTodoForm from './components/AddTodoForm'
import TodoFilters from './components/TodoFilters'
import TodoList from './components/TodoList'
import TodoSummary from './components/TodoSummary'

function App() {
	return (
		<main
			className="py-10
				h-screen
				space-y-5
				overflow-auto"
		>
			<h1
				className="font-bold
					text-3xl
					text-center"
			>
				My Todos
			</h1>

			<div
				className="max-w-lg
					mx-auto
					bg-slate-400
					rounded-md
					p-5
					space-y-6"
			>
				<AddTodoForm />
				<TodoFilters />
				<TodoList />
			</div>
			<TodoSummary />
		</main>
	)
}

export default App
