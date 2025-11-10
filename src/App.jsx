import { useEffect, useMemo, useState } from 'react'
import { MessageSquarePlus } from 'lucide-react'
import Hero from './Hero'
import PostCard from './components/PostCard'
import NewPostForm from './components/NewPostForm'
import Filters from './components/Filters'
import PostModal from './components/PostModal'

function App() {
  const fallbackBackend = 'https://ta-01k9qn7r89xp0tqw7pwj35b10f-8000.wo-sd4mgb9sv14bxf5a1kr2qlfwv.w.modal.host'
  const baseUrl = import.meta.env.VITE_BACKEND_URL || fallbackBackend
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ timeRange: 'week', sortBy: 'votes' })
  const [active, setActive] = useState(null)
  const [pendingVotes, setPendingVotes] = useState({})

  const query = useMemo(() => new URLSearchParams({
    time_range: filters.timeRange,
    sort_by: filters.sortBy,
  }).toString(), [filters])

  const fetchItems = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch(`${baseUrl}/api/posts?${query}`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || 'Failed to fetch posts')
      }
      const data = await res.json()
      setItems(data.items)
      setTotal(data.total)
    } catch (e) {
      setError(e.message || 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [query])

  const handleVote = async (post) => {
    // Optimistic toggle for instant feedback
    setPendingVotes(p => ({ ...p, [post.id]: true }))
    const prev = items
    const optimistic = items.map(i => {
      if (i.id !== post.id) return i
      const voted = !i.voted
      const votes_count = i.votes_count + (voted ? 1 : -1)
      return { ...i, voted, votes_count }
    })
    setItems(optimistic)

    try {
      const res = await fetch(`${baseUrl}/api/posts/${post.id}/vote`, { method: 'POST' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.detail || 'Voting failed')
      // Align with server result
      setItems(prevItems => prevItems.map(i => i.id === post.id ? { ...i, votes_count: data.votes_count, voted: data.voted } : i))
    } catch (e) {
      // Revert on failure
      setItems(prev)
      alert(e.message)
    } finally {
      setPendingVotes(p => ({ ...p, [post.id]: false }))
    }
  }

  const handleCreated = () => {
    fetchItems()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50">
      <Hero />

      <div className="max-w-5xl mx-auto px-6 -mt-14 md:-mt-16 relative z-10">
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Discover ideas</h2>
            <div className="inline-flex items-center gap-2 text-gray-600"><MessageSquarePlus className="h-5 w-5"/>Post an idea below</div>
          </div>
          <NewPostForm onCreated={handleCreated} />
          <div className="h-4" />
          <Filters onChange={setFilters} />
          <div className="h-3" />
          {loading ? (
            <div className="text-center text-gray-600 py-12">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-12">{error}</div>
          ) : (
            <div className="space-y-3">
              {items.length === 0 && (<div className="text-center text-gray-500 py-8">No ideas yet. Be the first!</div>)}
              {items.map(item => (
                <PostCard key={item.id} post={item} pending={!!pendingVotes[item.id]} onVote={handleVote} onOpen={setActive} />
              ))}
            </div>
          )}
        </div>
      </div>
      <footer className="mt-10 md:mt-12 pb-8 text-center text-sm text-gray-500">
        Built with <span className="mx-1" role="img" aria-label="love">❤️</span> at <a className="underline hover:text-gray-700" href="https://flames.blue/" target="_blank" rel="noreferrer">Flames.Blue</a>
      </footer>

      {active && (
        <PostModal post={active} onClose={() => setActive(null)} onVoted={(d)=> setItems(prev => prev.map(i => i.id === d.id ? { ...i, votes_count: d.votes_count, voted: d.voted } : i))} />
      )}
    </div>
  )
}

export default App
