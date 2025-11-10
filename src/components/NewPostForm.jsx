import { useState } from 'react'

export default function NewPostForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, url: url || null }),
      })
      if (!res.ok) throw new Error('Failed to create post')
      const data = await res.json()
      onCreated?.(data)
      setTitle(''); setDescription(''); setUrl('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your idea title" className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Optional link" className="w-60 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the idea" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]" required />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex justify-end">
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60">{loading ? 'Posting...' : 'Post Idea'}</button>
      </div>
    </form>
  )
}
