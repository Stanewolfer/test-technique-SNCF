const API_BASE = 'http://localhost:8000/api'

export async function fetchAPI<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  return res.json()
}

export async function postAPI<T>(url: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function putAPI<T>(url: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data)
  })
  return res.json()
}

export async function deleteAPI<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, { method: 'DELETE' })
  return res.json()
}
