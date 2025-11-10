import { useEffect, useMemo, useState } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import Hero from './Hero'
import PostCard from './components/PostCard'
import NewPostForm from './components/NewPostForm'
import Filters from './components/Filters'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ timeRange: 'week', sortBy: 'votes' })

  const query = useMemo(() => new URLSearchParams({
    time_range: filters.timeRange,
    sort_by: filters.sortBy,
  }).toString(), [filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${baseUrl}/api/posts?${query}`)
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = await res.json()
      setItems(data.items)
      setTotal(data.total)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [query])

  const handleVote = async (post) => {
    try {
      const res = await fetch(`${baseUrl}/api/posts/${post.id}/vote`, { method: 'POST' })
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}))
        throw new Error(msg.detail || 'Voting failed')
      }
      await fetchItems()
    } catch (e) {
      alert(e.message)
    }
  }

  const handleCreated = () => {
    fetchItems()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50">
      <Hero />

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Discover ideas</h2>
            <div className="inline-flex items-center gap-2 text-gray-600"><MessageSquarePlus className="h-5 w-5"/>Post an idea below</div>
          </div>
          <NewPostForm onCreated={handleCreated} />
          <div className="h-6" />
          <Filters onChange={setFilters} />
          <div className="h-4" />
          {loading ? (
            <div className="text-center text-gray-600 py-12">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-12">{error}</div>
          ) : (
            <div className="space-y-3">
              {items.length === 0 && (<div className="text-center text-gray-500 py-8">No ideas yet. Be the first!</div>)}
              {items.map(item => (
                <PostCard key={item.id} post={item} onVote={handleVote} onOpen={() => {}} />
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
        Built with Vibe Coding • Product Hunt-inspired • Single-IP voting enforced
      </footer>
    </div>
  )
}

export default App
