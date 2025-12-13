import { HomeFilled, UploadOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

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
]

function AppSidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = location.pathname.startsWith('/videoUpload')
    ? 'upload'
    : 'home'

  const handleMenuClick = ({ key }) => {
    if (key === 'home') {
      navigate('/dashboard')
    }
    if (key === 'upload') {
      navigate('/videoUpload')
    }
  }

  return (
    <Sider
      className="dashboard-sider-left"
      width={256}
      theme="light"
      trigger={null}
      collapsible={false}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={sidebarItems}
        onClick={handleMenuClick}
      />
    </Sider>
  )
}

export default AppSidebar
