const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL;

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
  const res = await fetch(`${getApiUrl()}/api/v1/auth/signup`, {
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
  const res = await fetch(`${getApiUrl()}/api/v1/auth/login`, {
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
  const res = await fetch(`${getApiUrl()}/api/v1/auth/me`, {
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

// ------- Events API (backend-powered) -------

export type BackendEvent = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  startTime: string;
  endTime: string;
  eventType: "virtual" | "inperson" | "offline";
  location: string;
  venue: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  registrationUrl: string;
  tags: string[];
  host?: {
    name?: string;
    avatar?: string;
    title?: string;
    bio?: string;
    linkedin?: string;
    x?: string;
  };
  speakers?: Array<{
    name?: string;
    avatar?: string;
    title?: string;
    bio?: string;
    linkedin?: string;
    x?: string;
  }>;
  agenda?: Array<{
    time?: string;
    title?: string;
    description?: string;
  }>;
  createdAt?: string;
  updatedAt?: string;
};

export type GetEventsResponse = {
  events: BackendEvent[];
  total: number;
  page: number;
  pages: number;
};

export async function getEventsApi(token?: string): Promise<GetEventsResponse> {
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getApiUrl()}/api/v1/event/`, {
    headers,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to fetch events";
    throw new Error(message);
  }

  if (!data || typeof data !== "object" || !("events" in data)) {
    throw new Error("Unexpected response from server while fetching events");
  }

  return data as GetEventsResponse;
}

export async function getEventBySlugApi(
  slug: string,
  token?: string
): Promise<BackendEvent | null> {
  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${getApiUrl()}/api/v1/event/${encodeURIComponent(slug)}`, {
    headers,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to fetch event";
    throw new Error(message);
  }

  if (!data || typeof data !== "object") {
    throw new Error("Unexpected response from server while fetching event");
  }

  return data as BackendEvent;
}

export type CreateEventPayload = {
  title: string;
  slug: string;
  description: string;
  summary: string;
  startTime: string;
  endTime: string;
  eventType: "virtual" | "inperson" | "offline";
  location: string;
  venue: string;
  registrationUrl: string;
  tags: string[];
  bannerUrl?: string;
  thumbnailUrl?: string;
  host?: BackendEvent["host"];
  speakers?: BackendEvent["speakers"];
  agenda?: BackendEvent["agenda"];
};

export async function createEventApi(
  token: string,
  payload: CreateEventPayload
): Promise<BackendEvent> {
  const res = await fetch(`${getApiUrl()}/api/v1/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to create event";
    throw new Error(message);
  }

  return data as BackendEvent;
}

export async function uploadThumbnailApi(
  token: string,
  eventId: string,
  file: File
): Promise<BackendEvent> {
  const form = new FormData();
  form.append("thumbnail", file);

  const res = await fetch(
    `${getApiUrl()}/api/v1/event/${encodeURIComponent(eventId)}/add-thumbnail`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to upload thumbnail";
    throw new Error(message);
  }

  return data as BackendEvent;
}

export async function uploadBannerApi(
  token: string,
  eventId: string,
  file: File
): Promise<BackendEvent> {
  const form = new FormData();
  form.append("banner", file);

  const res = await fetch(
    `${getApiUrl()}/api/v1/event/${encodeURIComponent(eventId)}/add-banner`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to upload banner";
    throw new Error(message);
  }

  return data as BackendEvent;
}

export async function updateEventApi(
  token: string,
  eventId: string,
  payload: Partial<BackendEvent>
): Promise<BackendEvent> {
  const res = await fetch(`${getApiUrl()}/api/v1/event/${eventId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to update event";
    throw new Error(message);
  }

  return data as BackendEvent;
}
export async function deleteEventApi(
  token: string,
  eventId: string
): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/v1/event/${encodeURIComponent(eventId)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json();
  }

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? (data as any).error
        : "Failed to delete event";
    throw new Error(message);
  }
}

