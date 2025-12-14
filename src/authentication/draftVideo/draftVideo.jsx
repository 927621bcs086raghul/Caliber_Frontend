import { useEffect, useState,useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import AppSidebar from '../../components/AppSidebar'
import useDebounce from '../../hooks/useDebounce'
import DashboardHeader from '../dashboard/components/DashboardHeader'
import '../draftVideo/draftVideo.css'
import  DraftGrid from  './components/DraftGrid';

const socket = io('http://localhost:5000')

function draftVideo() {
const location = useLocation()
  const [liveVideos, setLiveVideos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 400)
  
  // Hide sidebar on profile page
  const isProfilePage = location.pathname === '/profile'

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
         <DraftGrid videos={filteredVideos} />
    </div>
  )
}

export default draftVideo