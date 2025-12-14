import { PlayCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import UserProfilePopover from '../../../components/UserProfilePopover'
import { logoutRequest } from '../../logout/logoutSlice'
import '../Dashboard.css'

const { Title, Link } = Typography

function DashboardHeader({ searchTerm, onSearchChange, hideSearch = false, showDashboardLink = false }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Hide search bar on video upload and profile pages
  const hideSearchBar = location.pathname === '/videoUpload' || location.pathname === '/profile'

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const handleLogoutClick = () => {
    dispatch(logoutRequest())
  }

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <div className="dashboard-logo-group" onClick={handleLogoClick}>
          <div className="dashboard-logo-icon">
            <PlayCircleOutlined />
          </div>
          <Title level={4}>
            StreamHub
          </Title>
        </div>

        {!hideSearch && (
          <div className="dashboard-search-wrapper">
            <Input
              className="dashboard-search-input"
              prefix={<SearchOutlined />}
              placeholder="Search  videos..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="dashboard-header-right">
        {showDashboardLink && (
          <Link
            className="dashboard-link-button"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Link>
        )}

        {!hideSearch && (
          <Button
            type="text"
            icon={<SearchOutlined />}
            className="dashboard-icon-button dashboard-icon-button-mobile"
          />
        )}

        <UserProfilePopover
          size={40}
          avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
          onProfileClick={handleProfileClick}
          onLogoutClick={handleLogoutClick}
        />
      </div>
    </header>
  )
}

export default DashboardHeader
