import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import AppSidebar from '../../components/AppSidebar'
import useDebounce from '../../hooks/useDebounce'
import DashboardHeader from './components/DashboardHeader'
import './Dashboard.css'
import '../videoUpload/VideoUpload.css'

// Single shared Socket.IO connection for the dashboard
const socket = io('http://localhost:5000')

function DashboardLayout() {
  const location = useLocation()
  const [liveVideos, setLiveVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Hide sidebar on profile page
  const isProfilePage = location.pathname === '/profile'

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 1024)
      // Auto-collapse on small screens
      if (width < 1024) {
        setCollapsed(true)
      }
    }

    // Initial check
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <DashboardHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        showToggle={!isProfilePage}
      />

      {/* Body layout */}
      <div className="dashboard-layout">
        {/* Left sidebar - hidden on profile page */}
        {!isProfilePage && <AppSidebar collapsed={collapsed} />}

        {/* Main */}
        <main className={isProfilePage ? "dashboard-main dashboard-main-full" : "dashboard-main"}>
          <Outlet context={{ liveVideos, searchTerm, debouncedSearchTerm }} />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout