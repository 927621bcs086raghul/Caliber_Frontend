import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { io } from 'socket.io-client'
import useDebounce from '../../hooks/useDebounce'
import '../draftVideo/draftVideo.css'
import DraftGrid from './components/DraftGrid'

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

    const loadVideosAndSocket = () => {
  // Socket connection diagnostics
  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('Socket connect error:', err);
  });

  // Initial load of existing videos
  fetch('http://localhost:5000/api/videos/draftFetch', {
    method: 'GET',
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Initial videos load:', data);
      try {
        const stored = localStorage.getItem('loginUser')
        const parsed = stored ? JSON.parse(stored) : null
        const currentUserId = parsed?.user?.id

        if (Array.isArray(data)) {
          const filtered = currentUserId
            ? data.filter((video) =>
                video.User?.id === currentUserId ||
                video.userId === currentUserId ||
                video.UserId === currentUserId
              )
            : data
          setLiveVideos(filtered.reverse()) // newest first
        } else {
          console.warn('Unexpected videos payload:', data)
        }
      } catch (e) {
        console.error('Failed to filter videos by current user', e)
        if (Array.isArray(data)) {
          setLiveVideos(data.reverse())
        }
      }
    })
    .catch((err) => console.error('Failed to load videos', err));

  // Join socket room
  socket.emit('joinRoom', 'dashboard');

  const handleVideoUploaded = (video) => {
    console.log('Received videoUploaded:', video);
    try {
      const stored = localStorage.getItem('loginUser')
      const parsed = stored ? JSON.parse(stored) : null
      const currentUserId = parsed?.user?.id

      if (
        currentUserId &&
        !(
          video.User?.id === currentUserId ||
          video.userId === currentUserId ||
          video.UserId === currentUserId
        )
      ) {
        return
      }
    } catch (e) {
      console.error('Failed to check video user for socket event', e)
    }

    setLiveVideos((prev) => [video, ...prev])
  };

  socket.on('videoUploaded', handleVideoUploaded);

  // Return cleanup function
  return () => {
    socket.off('videoUploaded', handleVideoUploaded);
    socket.off('connect');
    socket.off('connect_error');
  };
};


useEffect(() => {
  const cleanup = loadVideosAndSocket();

  return () => {
    cleanup && cleanup();
  };
}, []);


const handlePublishDraft = async (videoId, formData) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/videos/${videoId}`,
      {
        method: 'PATCH',
        credentials: 'include', // ✅ sends cookies
        body: formData,         // ✅ FormData (NO headers needed)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Publish failed');
    }

    // 🔁 Reload videos after publish
    loadVideosAndSocket();

  } catch (error) {
    console.error('Publish failed:', error.message);
  }
};


  return (
    <div className="dashboard-root">
         <DraftGrid videos={filteredVideos} onPublishDraft={handlePublishDraft} />
    </div>
  )
}

export default draftVideo