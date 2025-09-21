import tasks from "../data/tasks.json";
import type { Task } from "../types/task";

const columns = [
  {
    title: "To Do",
    color: "bg-slate-700",
    header: "text-blue-300",
    border: "border-blue-500",
    status: "TODO",
  },
  {
    title: "In Progress",
    color: "bg-slate-700",
    header: "text-yellow-300",
    border: "border-yellow-500",
    status: "IN_PROGRESS",
  },
  {
    title: "Done",
    color: "bg-slate-900",
    header: "text-green-300",
    border: "border-green-500",
    status: "DONE",
  },
];

const KanbanBoard = () => {
  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <h1 className="text-4xl font-bold text-center text-slate-100 mb-12 tracking-tight">
        Kanban Board
      </h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-6xl mx-auto">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-xl shadow-lg p-5 ${col.color} min-h-[400px]`}
          >
            <h2 className={`text-2xl font-semibold mb-4 ${col.header}`}>
              {col.title}
            </h2>
            <div className="flex flex-col gap-4">
              {(tasks as Task[])
                .filter((task: Task) => task.status === col.status)
                .map((task: Task) => (
                  <div
                    key={task.id}
                    className={`bg-slate-800 rounded-lg shadow p-4 border-l-4 ${col.border} hover:shadow-md transition`}
                  >
                    <div className="font-medium text-slate-100">
                      {task.title}
                    </div>
                    <div className="text-slate-300 text-sm">
                      {task.description}
                    </div>
                    <div className="text-slate-400 text-xs mt-2 flex justify-between">
                      <span>User ID: {task.asignedTo.name}</span>
                      <span>
                        Created:{" "}
                        {task.createdAt
                          ? new Date(task.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
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
