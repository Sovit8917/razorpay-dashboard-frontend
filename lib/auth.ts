const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function extractError(data: any): string {
  if (Array.isArray(data.message)) return data.message.join(", ");
  if (typeof data.message === "string") return data.message;
  return JSON.stringify(data);
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
}

export async function getMe(access_token: string) {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data; // { data: { user: { uuid, name, email } } }
}

export async function getDashboard(access_token: string) {
  const res = await fetch(`${BASE_URL}/users/dashboard`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data; // { data: { user, subscriptions: { ...plan } } }
}

export async function refreshToken(refresh_token: string) {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
}