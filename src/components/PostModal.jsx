import { useEffect, useState } from 'react'
import { X, ArrowBigUp, MessageSquare, Loader2 } from 'lucide-react'

export default function PostModal({ post, onClose, onVoted }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [details, setDetails] = useState(post)
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [pendingVote, setPendingVote] = useState(false)
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const r1 = await fetch(`${baseUrl}/api/posts/${post.id}`)
        const d1 = await r1.json()
        setDetails(d1)
        const r2 = await fetch(`${baseUrl}/api/posts/${post.id}/comments`)
        const d2 = await r2.json()
        setComments(d2)
      } catch (e) {
        setErr('Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [post.id])

  const vote = async () => {
    if (pendingVote) return
    setPendingVote(true)
    // optimistic update for instant feedback
    setDetails(p => {
      const voted = !p.voted
      const votes_count = (p.votes_count || 0) + (voted ? 1 : -1)
      return { ...p, voted, votes_count }
    })
    try {
      const r = await fetch(`${baseUrl}/api/posts/${post.id}/vote`, { method: 'POST' })
      const d = await r.json()
      if (!r.ok) throw new Error(d.detail || 'Voting failed')
      setDetails(p => ({ ...p, votes_count: d.votes_count, voted: d.voted }))
      onVoted?.(d)
    } catch (e) {
      // revert if error by refetching
      const r1 = await fetch(`${baseUrl}/api/posts/${post.id}`)
      const d1 = await r1.json()
      setDetails(d1)
      alert(e.message)
    } finally {
      setPendingVote(false)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!content.trim() || posting) return
    setPosting(true)
    try {
      const r = await fetch(`${baseUrl}/api/posts/${post.id}/comments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ author: author || null, content })
      })
      if (!r.ok) {
        const d = await r.json().catch(()=>({}))
        throw new Error(d.detail || 'Failed to post comment')
      }
      setAuthor(''); setContent('')
      const [r2] = await Promise.all([
        fetch(`${baseUrl}/api/posts/${post.id}/comments`)
      ])
      const d2 = await r2.json()
      setComments(d2)
      setDetails(p => ({ ...p, comments_count: (p.comments_count || 0) + 1 }))
    } catch (e) {
      alert(e.message)
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-xl p-4 sm:p-6 m-0 sm:m-4">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X className="h-5 w-5"/></button>

        {loading ? (
          <div className="py-16 text-center text-gray-600">Loading...</div>
        ) : err ? (
          <div className="py-8 text-center text-red-600">{err}</div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <button onClick={vote} disabled={pendingVote} className={`relative flex flex-col items-center justify-center w-14 rounded-lg border ${details?.voted ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:bg-blue-50/80 hover:border-blue-200'} transition-colors ${pendingVote ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {pendingVote && <Loader2 className="absolute -top-2 -right-2 h-4 w-4 animate-spin text-blue-600" />}
                <ArrowBigUp className={`h-6 w-6 ${details?.voted ? 'text-white' : 'text-blue-600'}`} />
                <span className={`text-sm font-semibold ${details?.voted ? 'text-white' : 'text-blue-700'}`}>{details?.votes_count ?? 0}</span>
              </button>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900">{details?.title}</h3>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{details?.description}</p>
                {details?.url && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Link:</span>
                    <span className="ml-2 break-all text-blue-600">{details.url}</span>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">{new Date(details?.created_at).toLocaleString()}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2"><MessageSquare className="h-4 w-4"/> Comments ({details?.comments_count ?? 0})</h4>
              <form onSubmit={addComment} className="mt-3 flex flex-col gap-2">
                <div className="flex gap-2">
                  <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Name (optional)" className="w-40 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                  <input value={content} onChange={e=>setContent(e.target.value)} placeholder="Write a comment" className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  <button disabled={posting} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2">
                    {posting && <Loader2 className="h-4 w-4 animate-spin" />} Post
                  </button>
                </div>
              </form>
              <div className="mt-4 space-y-3 max-h-64 overflow-auto pr-1">
                {comments.length === 0 ? (
                  <div className="text-sm text-gray-500">No comments yet. Be the first!</div>
                ) : comments.map(c => (
                  <div key={c.id} className="p-3 border border-gray-200 rounded-lg bg-white/60">
                    <div className="text-sm text-gray-600">{c.author || 'Anonymous'} • {new Date(c.created_at).toLocaleString()}</div>
                    <div className="mt-1 text-gray-800">{c.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
