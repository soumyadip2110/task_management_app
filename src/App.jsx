import { useState, useEffect } from 'react';
import './App.css'
import AddTask from './components/AddTask'
import Tab from './components/Tab'

function App() {
	const [hidden, setHidden] = useState(true);
	const [triggerTasks, setTriggerTasks] = useState(true);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		// setApiData();
		const allTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
		if (allTasks.length > 0) setTasks(allTasks);
		else setTasks([])
	}, [triggerTasks]);

	const updateHidden = () => {
		setHidden(prev => !prev)
	}

	const updateTasks = () => {
		setTriggerTasks(prev => !prev);
	}

	// Sample fetch API code
	const setApiData = () => {
		fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
			.then(res => res.json())
			.then(data => setTasks(data))
	}


	// Handle task dragged and dropped into another tab
	const handleDropTask = (taskId, newStatus) => {
		let flag = false;
		const updated = tasks?.map(task => {
			if (task.id == taskId) flag = true;
			return task.id == taskId ? { ...task, status: newStatus } : task
		}
		);
		const newTasks = JSON.stringify(updated)
		if (flag) {
			window.localStorage.setItem('tasks', newTasks)
			updateTasks();
		}
	};


	return (
		<div className="min-h-screen w-full bg-gray-50 px-4 py-6">
			{/* Header & Add button */}
			<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 max-w-5xl mx-auto mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
					Task Management Dashboard
				</h1>
				<button
					onClick={updateHidden}
					className={`${hidden
						? 'bg-blue-600 hover:bg-blue-500'
						: 'bg-red-500 hover:bg-red-400'
						} text-white px-4 py-2 text-sm rounded shadow transition cursor-pointer w-full sm:w-auto`}
				>
					{hidden ? '+ Add Task' : 'Close'}
				</button>
			</div>

			{/* Add Task Form */}
			<AddTask hidden={hidden} updateTasks={updateTasks} />

			{/* Tab Layout */}
			<div className="flex flex-col items-center md:flex-row md:space-x-4 space-y-4 md:space-y-0 max-w-5xl mx-auto">
				<Tab
					title="To Do"
					tasks={tasks}
					onDropTask={handleDropTask}
					children="border-blue-500 bg-blue-100 text-blue-600"
					updateTasks={updateTasks}
				/>
				<Tab
					title="In Progress"
					tasks={tasks}
					onDropTask={handleDropTask}
					children="border-yellow-400 bg-yellow-100 text-yellow-600"
					updateTasks={updateTasks}
				/>
				<Tab
					title="Done"
					tasks={tasks}
					onDropTask={handleDropTask}
					children="border-green-500 bg-green-100 text-green-600"
					updateTasks={updateTasks}
				/>
			</div>
		</div>
	)
}

export default App
