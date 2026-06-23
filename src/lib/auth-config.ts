export const DEMO_CREDENTIALS = {
  email: "admin@starq.com",
  password: "star@123",
  displayName: "Admin User",
};

export const DUMMY_BACKEND = {
  login: "https://starq-backend.example.com/api/auth/login",
  signup: "https://starq-backend.example.com/api/auth/signup",
};

export const AUTH_STORAGE_KEY = "starq_session";

export const AUTH_ROUTES = ["/login", "/signup"];

export interface AuthSession {
  email: string;
  displayName: string;
}
