const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName?: string;
  course: string;
  branch: string;
  profile_photo?: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  course: string;
  branch: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function signupApi(payload: SignupPayload) {
  const res = await fetch(`${getApiUrl()}/api/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? (data as any).error
      : "Signup failed";
    throw new Error(message);
  }
  if (!data) {
    throw new Error("Unexpected response from server during signup");
  }
  return data as { message: string; username: string; token: string };
}

export async function loginApi(payload: LoginPayload) {
  const res = await fetch(`${getApiUrl()}/api/v1/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? (data as any).error
      : "Login failed";
    throw new Error(message);
  }
  if (!data) {
    throw new Error("Unexpected response from server during login");
  }
  return data as { message: string; username: string; token: string };
}

export async function getMeApi(token: string) {
  const res = await fetch(`${getApiUrl()}/api/v1/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? (data as any).error
      : "Failed to fetch user";
    throw new Error(message);
  }
  if (!data) {
    throw new Error("Unexpected response from server while fetching user");
  }
  return data as User;
}

export async function updateProfilePhotoApi(token: string, file: File) {
  const form = new FormData();
  form.append("profile_photo", file);
  const res = await fetch(`${getApiUrl()}/api/v1/me/profile-photo`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }
  if (!res.ok) {
    const message = data && typeof data === "object" && "error" in data
      ? (data as any).error
      : "Upload failed";
    throw new Error(message);
  }
  if (!data) {
    throw new Error("Unexpected response from server during upload");
  }
  return data as User;
}
