import { useState } from 'react';
import _tasks from '../data/tasks.json';
import type { Task } from '../types/task';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>(_tasks as Task[]);

    const columns: { key: Task['status']; title: string; color: string }[] = [
        { key: 'TODO', title: 'TODO', color: 'border-red-400' },
        { key: 'IN_PROGRESS', title: 'IN PROGRESS', color: 'border-yellow-400' },
        { key: 'DONE', title: 'DONE', color: 'border-green-400' },
    ];

    return (
        <div className="container mx-auto px-12 py-6 text-white">
            <h1 className="text-center text-3xl font-bold mb-6">Kanban Board</h1>

            <div className="grid grid-cols-3 gap-6">
                {columns.map((col) => (
                    <div key={col.key} className={`rounded-xl bg-zinc-900 backdrop-blur-md p-4`}>
                        <h2 className="text-center font-semibold text-xl mb-4 tracking-wide">
                            {col.title}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {(tasks as Task[])
                                .filter((task) => task.status === col.key)
                                .map((task) => (
                                    <div
                                        key={task.id}
                                        className="bg-zinc-800 rounded-lg shadow-md p-4 hover:bg-zinc-600 transition">
                                        <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                                        <p className="text-sm text-zinc-300 mb-2">
                                            {task.description}
                                        </p>

                                        <div className="flex justify-between text-xs text-zinc-400">
                                            <span>👤 {task.asignedTo.name}</span>
                                            <span>
                                                {new Date(task.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <span
                                            className={`inline-block mt-3 px-2 py-1 text-xs font-medium rounded-md ${
                                                task.status === 'TODO'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : task.status === 'IN_PROGRESS'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-green-500/20 text-green-400'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
