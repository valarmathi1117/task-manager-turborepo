"use client";

import { useState } from "react";
import { editTask } from "../actions";
import { Pencil, Save, X } from "lucide-react";


export default function EditTask({ task }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await editTask(task.id, formData);
          setEditing(false);
        }}
        className="flex items-center gap-1.5"
      >
        
        <input
          type="text"
          name="title"
          defaultValue={task.title}
          autoFocus
          className="w-36 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 sm:w-48"
          required
        />

       
        <button
          type="submit"
          title="Save changes"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-green-500/10 hover:text-green-400"
        >
          <Save size={17} strokeWidth={2} />
        </button>


        <button
          type="button"
          onClick={() => setEditing(false)}
          title="Cancel"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <X size={17} strokeWidth={2} />
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      title="Edit task"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-violet-500/10 hover:text-violet-400"
    >
      <Pencil size={17} strokeWidth={2} />
    </button>
  );
}