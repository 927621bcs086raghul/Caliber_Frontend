import { EllipsisOutlined } from '@ant-design/icons'
import { Avatar, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import '../Dashboard.css'

const { Title } = Typography

function DashboardTrendingGrid({ videos = [] }) {
  const navigate = useNavigate()

  const handleCardClick = (video) => {
    if (!video?.id) return
    // Pass the full video object so the player does not need to refetch
    navigate(`/videos/${video.id}`, { state: { video } })
  }
  return (
    <section>
      <div className="dashboard-trending-header">
        
         
      </div>

      <div className="dashboard-trending-grid">
        {videos.length === 0 ? (
          <p style={{ padding: '8px 0', color: '#8c8c8c' }}>No videos found.</p>
        ) : (
          videos.map((video) => (
            <article
              key={video.id}
              className="dashboard-card"
              onClick={() => handleCardClick(video)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="dashboard-card-media"
                style={
                  video.thumbnailPath
                    ? { backgroundImage: `url(http://localhost:5000${video.thumbnailPath})` }
                    : undefined
                }
              />
              <div className="dashboard-card-body">
                <Avatar
                  size={40}
                  src={
                    video.User?.id
                      ? undefined
                      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZxAswdIBayFqhB7BDEJaZOgdwGy-US8N1AqaC86j4LscvdHDolATVlJitXTCtFl18B8SXiz2cX693f3O4j36VZpZVVmc4SERkpUImSnFgyvVA1sSGEnDmGO935-y3mLzaDSZzcXOxMCiLpwW1UHVgxyfJe--ZdXT22RxZ2TExHikjCsR5axEStka2AsLT-b91ZeC2Za5Hht1lnJZm8DlhurMKUUfO5PvER8hZTQhIy27XnY8e8WISE6b5JtVmo_01HOgH56YVJIc'
                  }
                >
                  {video.User?.name?.[0]}
                </Avatar>
                <div>
                  <p className="dashboard-card-title">
                    {video.title || 'Untitled video'}
                  </p>
                  <p className="dashboard-card-meta">
                    {(video.User && video.User.name) || 'Unknown creator'}
                    {video.createdAt ? ` • ${new Date(video.createdAt).toLocaleString()}` : ''}
                  </p>
                </div>
                <div className="dashboard-card-more">
                  <Button type="text" icon={<EllipsisOutlined />} />
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default DashboardTrendingGrid
