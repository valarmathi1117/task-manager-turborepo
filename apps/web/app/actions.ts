"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTask(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || !title.trim()) {
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase.from("tasks").insert({
    title: title.trim(),
    user_id: user.id,
    is_completed: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}


export async function toggleTask(
  taskId: string,
  isCompleted: boolean
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      is_completed: !isCompleted,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}


export async function editTask(
  taskId: string,
  formData: FormData
) {
  const title = formData.get("title");

  if (typeof title !== "string" || !title.trim()) {
    return;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title: title.trim(),
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}


export async function deleteTask(id: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in");
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
}


export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}