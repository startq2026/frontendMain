"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { useAuth } from "@/context/AuthProvider";
import { DEMO_CREDENTIALS, DUMMY_BACKEND } from "@/lib/auth-config";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const loginError = await login(email, password);
    setIsSubmitting(false);

    if (loginError) {
      setError(loginError);
      return;
    }

    router.replace("/");
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your Star Q Analytics dashboard"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Create account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input"
            placeholder="admin@starq.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input pr-11"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign in
            </>
          )}
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-primary-100 bg-primary-50/70 p-4 dark:border-primary-900/50 dark:bg-primary-900/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-700 dark:text-primary-300">
          Demo credentials
        </p>
        <p className="mt-2 text-sm text-primary-800 dark:text-primary-200">
          Email: <span className="font-medium">{DEMO_CREDENTIALS.email}</span>
        </p>
        <p className="text-sm text-primary-800 dark:text-primary-200">
          Password: <span className="font-medium">{DEMO_CREDENTIALS.password}</span>
        </p>
        <p className="mt-3 text-xs text-primary-600/80 dark:text-primary-400/80">
          Backend: {DUMMY_BACKEND.login}
        </p>
      </div>
    </AuthLayout>
  );
}
