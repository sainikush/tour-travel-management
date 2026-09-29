const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const getToken = () => localStorage.getItem("token");

const request = async (path, { method = "GET", body, headers = {} } = {}) => {
  const token = getToken();

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    credentials: "include",
  };

  if (body) config.body = JSON.stringify(body);

  const res = await fetch(`${API_URL}${path}`, config);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed: ${res.status}`);
  }

  return data;
};

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body }),
  delete: (path) => request(path, { method: "DELETE" }),
};