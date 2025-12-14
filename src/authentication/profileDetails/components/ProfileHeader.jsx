import { PlayCircleOutlined } from '@ant-design/icons'
import UserProfilePopover from '../../../components/UserProfilePopover'

function ProfileHeader({ onDashboardClick, onProfileClick, onLogoutClick }) {
  return (
    <header className="profile-nav">
      <div className="profile-nav-left">
        <div className="profile-brand">
          <div className="dashboard-logo-icon">
            <PlayCircleOutlined />
          </div>
          <h2 className="profile-brand-title">StreamHub</h2>
        </div>
      </div>
      <div className="profile-nav-right">
        <button
          type="button"
          className="profile-nav-dashboard-link"
          onClick={onDashboardClick}
        >
          Dashboard
        </button>
        <div className="profile-nav-avatar">
          <UserProfilePopover
            avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
            onProfileClick={onProfileClick}
            onLogoutClick={onLogoutClick}
            size="large"
          />
        </div>
      </div>
    </header>
  )
}

export default ProfileHeader
