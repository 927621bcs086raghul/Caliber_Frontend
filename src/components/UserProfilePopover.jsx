import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu, Popover } from 'antd'

function UserProfilePopover({ avatarSrc, onProfileClick, onLogoutClick, size = 36 }) {
  const content = (
    <Menu selectable={false}>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={onProfileClick}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogoutClick}>
        Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <Popover content={content} trigger="hover" placement="bottomRight">
      <Avatar size={size} src={avatarSrc} style={{ cursor: 'pointer' }} />
    </Popover>
  )
}

export default UserProfilePopover
