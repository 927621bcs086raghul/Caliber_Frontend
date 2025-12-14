import DashboardTrendingGrid from '../../dashboard/components/DashboardTrendingGrid'

function UploadedVideosSection({ videos }) {
  if (!videos || videos.length === 0) return null

  return (
    <div className="uploaded-video-profile-contact-card">
      <div>
        <h2 className="profile-contact-title">Uploaded Videos</h2>
      </div>
      <DashboardTrendingGrid videos={videos} />
    </div>
  )
}

export default UploadedVideosSection
