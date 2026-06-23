import {
  AUTH_STORAGE_KEY,
  DEMO_CREDENTIALS,
  DUMMY_BACKEND,
  AuthSession,
} from "./auth-config";

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function setSession(session: AuthSession) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

async function callDummyBackend(
  url: string,
  payload: Record<string, string>,
): Promise<void> {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      mode: "no-cors",
    });
  } catch {
    // Dummy backend — network errors are expected and ignored.
  }
}

export async function login(
  email: string,
  password: string,
): Promise<{ error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    normalizedEmail !== DEMO_CREDENTIALS.email ||
    password !== DEMO_CREDENTIALS.password
  ) {
    return { error: "Invalid email or password. Use the demo credentials." };
  }

  await callDummyBackend(DUMMY_BACKEND.login, {
    email: normalizedEmail,
    password,
  });

  setSession({
    email: DEMO_CREDENTIALS.email,
    displayName: DEMO_CREDENTIALS.displayName,
  });

  return {};
}

export async function signup(
  displayName: string,
  email: string,
  password: string,
): Promise<{ error?: string }> {
  if (!displayName.trim() || !email.trim() || !password.trim()) {
    return { error: "All fields are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  await callDummyBackend(DUMMY_BACKEND.signup, {
    displayName: displayName.trim(),
    email: email.trim().toLowerCase(),
    password,
  });

  return {};
}
