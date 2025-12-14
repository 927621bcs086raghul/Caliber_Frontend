import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'
import UserProfilePopover from '../../../components/UserProfilePopover'

const { Title } = Typography

function UploadHeader({ onProfileClick, onLogoutClick }) {
  return (
    <div className="upload-header-inner">
      <div className="upload-header-left">
        <div className="upload-logo-group">
          <div className="dashboard-logo-icon">
            <PlayCircleOutlined />
          </div>
          <Title level={4} className="dashboard-logo-title">
            StreamHub
          </Title>
        </div>
      </div>

      <div className="upload-header-right">
        <Button
          type="text"
          className="upload-icon-button"
        />
        <UserProfilePopover
          avatarSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDFXUWnBEsX5liTUy2PJJ56e62aiI_vOCYt7X5WChinGbV39owQDu7xAqqvmTolqQBWRi9NzQxAYPgvoHvPqGJXlvnvZiu1WMQQ0v58fs1_kYCplzsSr2R2atw3gacr68qaQpzmOiKAcd160oALsHHQsbuVkp0QOzgGRx_CICEsjAOQSX5SW5uiajSRPX-7vAVU63swG_KnTegsavoMrdkEphoUe7qfDgESmzmgefsWDQ1Jz9uYcw6ELW5p1TDKaYg3A0HeSNUNkv4"
          onProfileClick={onProfileClick}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </div>
  )
}

export default UploadHeader
