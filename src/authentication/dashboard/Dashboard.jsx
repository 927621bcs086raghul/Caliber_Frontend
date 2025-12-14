import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'
import { getVideosByCategory } from '../../api/videoApi'
import DashboardTrendingGrid from './components/DashboardTrendingGrid'
import './Dashboard.css'

function Dashboard() {
  const dispatch = useDispatch()
  const { liveVideos, debouncedSearchTerm } = useOutletContext()
  const categories = useSelector((state) => state.videoCategories?.items || [])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryVideos, setCategoryVideos] = useState([])

  const filteredVideos = useMemo(() => {
    const sourceVideos = selectedCategory
      ? categoryVideos
      : (liveVideos || []).filter((video) => !video.draft)
    const q = debouncedSearchTerm.trim().toLowerCase()
    if (!q) return sourceVideos

    return sourceVideos.filter((video) => {
      const title = (video.title || '').toLowerCase()
      const description = (video.description || '').toLowerCase()
      const userName = (video.User?.name || '').toLowerCase()
      return (
        title.includes(q) ||
        description.includes(q) ||
        userName.includes(q)
      )
    })
  }, [liveVideos, categoryVideos, selectedCategory, debouncedSearchTerm])

  useEffect(() => {
    // Load global video categories when dashboard mounts
    import('../videoCategories/videoCategoriesSlice').then(({ videoCategoriesRequest }) => {
      dispatch(videoCategoriesRequest())
    })
  }, [dispatch])

  const handleRecentClick = () => {
    setSelectedCategory(null)
    setCategoryVideos([])
  }

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category)
    try {
      const data = await getVideosByCategory(category)
      if (Array.isArray(data)) {
        setCategoryVideos(data)
      } else {
        setCategoryVideos([])
      }
    } catch (err) {
      console.error('Failed to load category videos', err)
      setCategoryVideos([])
    }
  }

  return (
    <div className="dashboard-main-inner">
      {/* Filter bar */}
      <div className="dashboard-filter-bar">
        <div className="dashboard-filter-chips">
          <button
            className={selectedCategory ? 'dashboard-chip' : 'dashboard-chip-primary'}
            onClick={handleRecentClick}
          >
            Recent Video
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={
                category === selectedCategory ? 'dashboard-chip-primary' : 'dashboard-chip'
              }
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Trending grid */}
      <DashboardTrendingGrid videos={filteredVideos} />
    </div>
  )
}

export default Dashboard