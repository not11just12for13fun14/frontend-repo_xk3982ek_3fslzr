import { useState, useEffect } from 'react'

export default function Filters({ onChange }) {
  const [timeRange, setTimeRange] = useState('week')
  const [sortBy, setSortBy] = useState('votes')

  useEffect(() => {
    onChange?.({ timeRange, sortBy })
  }, [timeRange, sortBy])

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white/70 backdrop-blur border border-gray-200 rounded-xl p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Time:</span>
        <div className="flex gap-1">
          {['week', 'month', 'all'].map(v => (
            <button key={v} onClick={() => setTimeRange(v)} className={`px-3 py-1.5 text-sm rounded-lg border ${timeRange === v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{v === 'week' ? 'This week' : v === 'month' ? 'This month' : 'All time'}</button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort:</span>
        <div className="flex gap-1">
          {[
            {k: 'votes', label: 'Votes'},
            {k: 'comments', label: 'Comments'},
            {k: 'recent', label: 'Recency'},
          ].map(({k,label}) => (
            <button key={k} onClick={() => setSortBy(k)} className={`px-3 py-1.5 text-sm rounded-lg border ${sortBy === k ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>{label}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
