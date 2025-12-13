import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AppSidebar from '../../components/AppSidebar'
import DashboardHeader from './components/DashboardHeader'
import DashboardTrendingGrid from './components/DashboardTrendingGrid'
import './Dashboard.css'

// Single shared Socket.IO connection for the dashboard
const socket = io('http://localhost:5000')

function Dashboard() {
  const [liveVideos, setLiveVideos] = useState([])

  useEffect(() => {
    // Socket connection diagnostics
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('connect_error', (err) => {
      console.error('Socket connect error:', err)
    })

    // 1) Initial load of existing videos (once on mount)
    fetch('http://localhost:5000/api/videos', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Initial videos load:', data)
        if (Array.isArray(data)) {
          // newest first
          setLiveVideos(data.reverse())
        } else {
          console.warn('Unexpected videos payload:', data)
        }
      })
      .catch((err) => console.error('Failed to load videos', err))

    // 2) Real-time updates via Socket.IO
    socket.emit('joinRoom', 'dashboard')

    const handleVideoUploaded = (video) => {
      console.log('Received videoUploaded:', video)
      setLiveVideos((prev) => [video, ...prev])
    }

    socket.on('videoUploaded', handleVideoUploaded)

    return () => {
      socket.off('videoUploaded', handleVideoUploaded)
      socket.off('connect')
      socket.off('connect_error')
    }
  }, [])

  return (
    <div className="dashboard-root">
      {/* Header */}
      <DashboardHeader />

      {/* Body layout */}
      <div className="dashboard-layout">
        {/* Left sidebar */}
        <AppSidebar />

        {/* Main */}
        <main className="dashboard-main">
          <div className="dashboard-main-inner">
            {/* Filter bar */}
            <div className="dashboard-filter-bar">
              <div className="dashboard-filter-chips">
                <button className="dashboard-chip-primary">All</button>
              </div>
            </div>
              {/* Trending grid */}
            <DashboardTrendingGrid videos={liveVideos} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
    