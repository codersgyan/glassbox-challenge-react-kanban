import { useState } from 'react';
import _tasks from '../data/tasks.json';
import type { Task } from '../types/task';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskComponent from './task';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>(_tasks as Task[]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ name: 'Dustbin' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const columns: { key: Task['status']; title: string; color: string }[] = [
        { key: 'TODO', title: 'TODO', color: 'border-red-400' },
        { key: 'IN_PROGRESS', title: 'IN PROGRESS', color: 'border-yellow-400' },
        { key: 'DONE', title: 'DONE', color: 'border-green-400' },
    ];

    const isActive = canDrop && isOver;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    } else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }

    return (
        <div className="container mx-auto px-12 py-6 text-white">
            <h1 className="text-center text-3xl font-bold mb-6">Kanban Board</h1>

            <DndProvider backend={HTML5Backend}>
                <div className="grid grid-cols-3 gap-6">
                    {columns.map((col) => (
                        <div
                            key={col.key}
                            className={`rounded-xl bg-zinc-900 backdrop-blur-md p-4`}>
                            <h2 className="text-center font-semibold text-xl mb-4 tracking-wide">
                                {col.title}
                            </h2>

                            <div
                                ref={drop}
                                style={{ backgroundColor }}
                                className="flex flex-col gap-4">
                                {(tasks as Task[])
                                    .filter((task) => task.status === col.key)
                                    .map((task) => (
                                        <TaskComponent task={task} />
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </DndProvider>
        </div>
    );
};

export default KanbanBoard;
