const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";
const API_KEY =
  import.meta.env.VITE_API_KEY ?? "cogbazaar_demo_local_dev_key";

export type Envelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

function qs(params?: Record<string, string | number | boolean | undefined>) {
  if (!params) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<Envelope<T>> {
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  headers.set("X-API-Key", API_KEY);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (init.method && init.method !== "GET") {
    headers.set("Idempotency-Key", crypto.randomUUID());
  }
  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return { data: undefined as T };
  return (await res.json()) as Envelope<T>;
}

export function apiGet<T = unknown>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  return request<T>(`${path}${qs(params)}`);
}

export function apiPost<T = unknown>(path: string, body?: unknown) {
  return request<T>(path, {
    method: "POST",
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiPatch<T = unknown>(path: string, body: unknown) {
  return request<T>(path, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}
