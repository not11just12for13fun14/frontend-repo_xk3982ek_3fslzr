import { MessageSquare, ArrowBigUp, ExternalLink } from 'lucide-react'

export default function PostCard({ post, onVote, onOpen }) {
  return (
    <div className="group bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-4 flex gap-4 hover:shadow-md transition-all">
      <button
        onClick={() => onVote(post)}
        className="flex flex-col items-center justify-center w-16 rounded-lg border border-gray-200 hover:bg-blue-50/80 hover:border-blue-200 transition-colors"
        title="Upvote"
      >
        <ArrowBigUp className="h-6 w-6 text-blue-600" />
        <span className="text-sm font-semibold text-blue-700">{post.votes_count}</span>
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{post.title}</h3>
          {post.url && (
            <a href={post.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
              <ExternalLink className="h-4 w-4" /> link
            </a>
          )}
        </div>
        <p className="mt-1 text-gray-600 line-clamp-2">{post.description}</p>
        <div className="mt-2 text-sm text-gray-500">{new Date(post.created_at).toLocaleString()}</div>
      </div>
      <button
        onClick={() => onOpen(post)}
        className="shrink-0 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
      >
        <MessageSquare className="h-5 w-5" /> {post.comments_count}
      </button>
    </div>
  )
}
