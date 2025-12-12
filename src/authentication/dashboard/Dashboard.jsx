import { ClockCircleFilled, CompassFilled, HomeFilled, LikeFilled, VideoCameraFilled } from '@ant-design/icons'
import { Button } from 'antd'
import './Dashboard.css'
import DashboardHeader from './components/DashboardHeader'
import DashboardHeroSection from './components/DashboardHeroSection'
import DashboardTrendingGrid from './components/DashboardTrendingGrid'

function Dashboard() {
  return (
    <div className="dashboard-root">
      {/* Header */}
      <DashboardHeader />

      {/* Body layout */}
      <div className="dashboard-layout">
        {/* Left sidebar */}
        <aside className="dashboard-sider-left">
          <Button type="text" icon={<HomeFilled />}>
            Home
          </Button>
          <Button type="text" icon={<CompassFilled />}>
            Explore
          </Button>
          <Button type="text" icon={<VideoCameraFilled />}>
            Library
          </Button>
          <Button type="text" icon={<ClockCircleFilled />}>
            History
          </Button>
          <Button type="text" icon={<LikeFilled />}>
            Liked Videos
          </Button>
        </aside>

        {/* Main */}
        <main className="dashboard-main">
          <div className="dashboard-main-inner">
            {/* Filter bar */}
            <div className="dashboard-filter-bar">
              <div className="dashboard-filter-chips">
                <button className="dashboard-chip-primary">All</button>
                <button className="dashboard-chip">Gaming</button>
                <button className="dashboard-chip">Music</button>
                <button className="dashboard-chip">Technology</button>
              </div>
            </div>

            {/* Hero section */}
            <DashboardHeroSection />

            {/* Trending grid */}
            <DashboardTrendingGrid />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
    