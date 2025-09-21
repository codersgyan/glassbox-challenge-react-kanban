import { useDrag } from 'react-dnd';
import type { Task } from '../types/task';

type DropResult = {
    task: Task;
};
const TaskComponent = ({ task }: { task: Task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { task },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<DropResult>();
            if (item && dropResult) {
                alert(`You dropped ${item.task.title} into ${dropResult.task.title}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div
            ref={drag}
            style={{ opacity }}
            key={task.id}
            className="bg-zinc-800 rounded-lg shadow-md p-4 hover:bg-zinc-600 transition">
            <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
            <p className="text-sm text-zinc-300 mb-2">{task.description}</p>

            <div className="flex justify-between text-xs text-zinc-400">
                <span>👤 {task.asignedTo.name}</span>
                <span>{new Date(task.createdAt).toLocaleDateString()}</span>
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
    );
};

export default TaskComponent;
