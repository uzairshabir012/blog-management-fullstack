// The Vite proxy forwards /api requests to the existing Express backend.
// No backend files or routes are changed.
const API = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const validation = data.errors?.map((item) => item.msg).filter(Boolean).join(' ');
    throw new Error(validation || data.message || data.error || 'Something went wrong. Please try again.');
  }
  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  blogs: (page = 1, limit = 6) => request(`/blog?page=${page}&limit=${limit}`),
  blog: (id) => request(`/blog/${encodeURIComponent(id)}`),
  search: (query) => request(`/blog/search?query=${encodeURIComponent(query)}`),
  createBlog: (form) => request('/blog/create-blog', { method: 'POST', body: form }),
  updateBlog: (id, form) => request(`/blog/${encodeURIComponent(id)}`, { method: 'PATCH', body: form }),
  deleteBlog: (id) => request(`/blog/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
