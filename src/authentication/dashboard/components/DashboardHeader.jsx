import {
  BellOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import UserProfilePopover from '../../../components/UserProfilePopover'
import { logoutRequest } from '../../logout/logoutSlice'
import '../Dashboard.css'

const { Title } = Typography

function DashboardHeader() {
  const dispatch = useDispatch()

  const handleProfileClick = () => {
    // Navigate to profile page when implemented
  }

  const handleLogoutClick = () => {
    dispatch(logoutRequest())
  }

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <div className="dashboard-logo-group">
          <div className="dashboard-logo-icon">
            <PlayCircleOutlined />
          </div>
          <Title level={4} className="dashboard-logo-title">
            StreamHub
          </Title>
        </div>

        <div className="dashboard-search-wrapper">
          <Input
            className="dashboard-search-input"
            prefix={<SearchOutlined />}
            placeholder="Search creators, videos..."
          />
        </div>
      </div>

      <div className="dashboard-header-right">
        <Button
          type="text"
          icon={<SearchOutlined />}
          className="dashboard-icon-button dashboard-icon-button-mobile"
        />

        <div className="dashboard-header-actions">
          <div className="dashboard-bell-wrapper">
            <Button
              type="text"
              icon={<BellOutlined />}
              className="dashboard-icon-button"
            />
            <span className="dashboard-bell-badge" />
          </div>
          <Button
            type="text"
            icon={<MessageOutlined />}
            className="dashboard-icon-button"
          />
        </div>

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
