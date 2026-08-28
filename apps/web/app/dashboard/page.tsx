import { supabase } from "@/lib/supabase";
import { addTask, deleteTask, toggleTask, logout } from "../actions";
import EditTask from "../components/EditTask";
import { Check, Undo2, Trash2, LogOut, ListTodo } from "lucide-react";

export default async function Home() {
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  const totalTasks = tasks?.length ?? 0;

  const completedTasks =
    tasks?.filter((task) => task.is_completed).length ?? 0;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-[#09090b] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">

        <header className="mb-10 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20">
              <ListTodo size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Taskora
              </h1>

              <p className="text-xs text-zinc-500">
                Plan. Focus. Accomplish.
              </p>
            </div>

          </div>

          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>

        </header>

        <section className="mb-8">

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Good day..!!
          </h2>

          <p className="mt-2 text-zinc-500">
            Here's what's happening with your tasks today.
          </p>

        </section>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:border-violet-500/30">

            <p className="text-sm text-zinc-500">
              Total Tasks
            </p>

            <div className="mt-2 flex items-end justify-between">

              <p className="text-3xl font-bold text-white">
                {totalTasks}
              </p>

              <div className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400">
                All
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:border-orange-500/30">

            <p className="text-sm text-zinc-500">
              In Progress
            </p>

            <div className="mt-2 flex items-end justify-between">

              <p className="text-3xl font-bold text-white">
                {pendingTasks}
              </p>

              <div className="rounded-lg bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
                Pending
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 transition hover:border-green-500/30">

            <p className="text-sm text-zinc-500">
              Completed
            </p>

            <div className="mt-2 flex items-end justify-between">

              <p className="text-3xl font-bold text-white">
                {completedTasks}
              </p>

              <div className="rounded-lg bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Done
              </div>

            </div>

          </div>

        </section>
        <section className="mb-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">

          <div className="mb-4">

            <h2 className="font-semibold text-white">
              What needs to be done?
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add a task and keep moving forward.
            </p>

          </div>

          <form
            action={addTask}
            className="flex flex-col gap-3 sm:flex-row"
          >

            <input
              type="text"
              name="title"
              placeholder="Enter a new task..."
              required
              className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/10 transition hover:bg-violet-500"
            >
              + Add Task
            </button>

          </form>

        </section>

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              My Tasks
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Stay organized and keep making progress.
            </p>
          </div>

          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-400">
            {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
          </span>

        </div>
        <div className="space-y-3">

          
          {tasks?.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 px-6 py-16 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-2xl">
                📝
              </div>

              <h3 className="font-semibold text-white">
                You're all clear!
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Add your first task and start getting things done.
              </p>

            </div>
          )}
          {tasks?.map((task) => (

            <div
              key={task.id}
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 transition hover:border-zinc-700 hover:bg-zinc-900 sm:p-5"
            >
              <div className="flex min-w-0 items-center gap-4">

                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    task.is_completed
                      ? "bg-green-500/10 text-green-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {task.is_completed ? (
                    <Check size={18} />
                  ) : (
                    <span className="text-lg">○</span>
                  )}
                </div>


                <div className="min-w-0">

                  <p
                    className={`truncate font-medium ${
                      task.is_completed
                        ? "text-zinc-500 line-through"
                        : "text-zinc-200"
                    }`}
                  >
                    {task.title}
                  </p>

                  <p
                    className={`mt-1 text-xs ${
                      task.is_completed
                        ? "text-green-500"
                        : "text-orange-400"
                    }`}
                  >
                    {task.is_completed
                      ? "Completed"
                      : "In Progress"}
                  </p>

                </div>

              </div>

              <div className="ml-3 flex shrink-0 items-center gap-1.5">

                <form
                  action={toggleTask.bind(
                    null,
                    task.id,
                    task.is_completed
                  )}
                >
                  <button
                    type="submit"
                    title={
                      task.is_completed
                        ? "Undo task"
                        : "Mark as done"
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-green-500/10 hover:text-green-400"
                  >
                    {task.is_completed ? (
                      <Undo2 size={17} />
                    ) : (
                      <Check size={17} />
                    )}
                  </button>
                </form>
                <EditTask task={task} />
                <form
                  action={deleteTask.bind(
                    null,
                    task.id
                  )}
                >
                  <button
                    type="submit"
                    title="Delete task"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={17} />
                  </button>
                </form>

              </div>

            </div>

          ))}

        </div>
        <footer className="mt-12 border-t border-zinc-900 pt-6 text-center">

          <p className="text-xs text-zinc-600">
            Taskora · Built with Next.js & Supabase
          </p>

        </footer>

      </div>
    </main>
  );
}