
export async function getData<T>(
  path: string,
  credentials: boolean = false,
  name: string = ""
): Promise<T> {

  const res = await fetch(path, {
    credentials: credentials ? "include" : "same-origin",
  });

  if (!res.ok) throw new Error("Failed to fetch " + name);
  return res.json() as Promise<T>;
}

export async function submitData<TResponse, TBody = unknown>(
  path: string,
  body: TBody | null,
  credentials = false
): Promise<TResponse> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: credentials ? "include" : "same-origin",
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Failed POST ${path} → ${res.status}`);
  return res.json() as Promise<TResponse>;
}

