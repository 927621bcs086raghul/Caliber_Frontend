import { useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import DashboardTrendingGrid from './components/DashboardTrendingGrid'
import './Dashboard.css'

function Dashboard() {
  const { liveVideos, debouncedSearchTerm } = useOutletContext()

  const filteredVideos = useMemo(() => {
    const q = debouncedSearchTerm.trim().toLowerCase()
    if (!q) return liveVideos

    return liveVideos.filter((video) => {
      const title = (video.title || '').toLowerCase()
      const description = (video.description || '').toLowerCase()
      const userName = (video.User?.name || '').toLowerCase()
      return (
        title.includes(q) ||
        description.includes(q) ||
        userName.includes(q)
      )
    })
  }, [liveVideos, debouncedSearchTerm])

  return (
    <div className="dashboard-main-inner">
      {/* Filter bar */}
      <div className="dashboard-filter-bar">
        <div className="dashboard-filter-chips">
          <button className="dashboard-chip-primary">All</button>
        </div>
      </div>
      {/* Trending grid */}
      <DashboardTrendingGrid videos={filteredVideos} />
    </div>
  )
}

export default Dashboard