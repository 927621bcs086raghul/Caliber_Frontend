import { ClockCircleFilled, CompassFilled, HomeFilled, LikeFilled, UploadOutlined, VideoCameraFilled } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
import DashboardHeader from './components/DashboardHeader'
import DashboardHeroSection from './components/DashboardHeroSection'
import DashboardTrendingGrid from './components/DashboardTrendingGrid'

const { Sider } = Layout

const sidebarItems = [
  {
    key: 'home',
    icon: <HomeFilled />,
    label: 'Home',
  },
  {
    key: 'upload',
    icon: <UploadOutlined />,
    label: 'Upload',
  },
  {
    key: 'explore',
    icon: <CompassFilled />,
    label: 'Explore',
  },
  {
    key: 'library',
    icon: <VideoCameraFilled />,
    label: 'Library',
  },
  {
    key: 'history',
    icon: <ClockCircleFilled />,
    label: 'History',
  },
  {
    key: 'liked',
    icon: <LikeFilled />,
    label: 'Liked Videos',
  },
]

function Dashboard() {
  const navigate = useNavigate()

  const handleMenuClick = ({ key }) => {
    if (key === 'upload') {
      navigate('/videoUpload')
    }
  }

  return (
    <div className="dashboard-root">
      {/* Header */}
      <DashboardHeader />

      {/* Body layout */}
      <div className="dashboard-layout">
        {/* Left sidebar */}
        <Sider className="dashboard-sider-left" width={256} theme="light" trigger={null} collapsible={false}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            items={sidebarItems}
            onClick={handleMenuClick}
          />
        </Sider>

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
    