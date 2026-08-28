"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "./action";
import { CheckSquare, Mail, Lock, ArrowRight } from "lucide-react";

const initialState = {
  error: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    login,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#09090b] px-4 py-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <CheckSquare size={28} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            Taskora
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Plan. Focus. Accomplish.
          </p>

        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7 shadow-2xl shadow-black/20 sm:p-8">

          <div className="mb-7">

            <h2 className="text-2xl font-bold text-white">
              Welcome back..!
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Sign in to continue managing your tasks.
            </p>

          </div>


          <form action={formAction} className="space-y-5">
            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

            </div>
            <div>

              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

              </div>

            </div>
            {state.error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">
                  {state.error}
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 p-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/10 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight size={17} />
                </>
              )}
            </button>

          </form>
          <div className="mt-7 border-t border-zinc-800 pt-6 text-center">

            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}

              <Link
                href="/signup"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Create an account
              </Link>
            </p>

          </div>

        </div>
        <p className="mt-6 text-center text-xs text-zinc-600">
          © 2026 Taskora. Stay productive.
        </p>

      </div>

    </main>
  );
}