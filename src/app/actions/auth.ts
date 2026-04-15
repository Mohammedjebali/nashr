"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";

export type AuthState = {
  error?: string;
  message?: string;
} | null;

export async function loginAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }
  if (typeof password !== "string" || !password) {
    return { error: "Password is required." };
  }

  const supabase = await createSupabaseServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Invalid email or password." };
    }
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Full name is required." };
  }
  if (typeof email !== "string" || !email.trim()) {
    return { error: "Email is required." };
  }
  if (typeof password !== "string" || !password) {
    return { error: "Password is required." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: name.trim(),
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user && !data.session) {
    return { message: "Check your email to confirm your account." };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  const supabase = await createSupabaseServer();
  await supabase.auth.signOut();
  redirect("/login");
}
