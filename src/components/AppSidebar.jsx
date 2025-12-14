import { HomeFilled, UploadOutlined, FileTextOutlined } from '@ant-design/icons'
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
   {
    key: 'draft',
    icon: <FileTextOutlined />,
    label: 'Drafted video',
  }
]

function AppSidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()

  const getSelectedKey = (pathname) => {
    if (pathname.startsWith('/dashboard')) return 'home'
    if (pathname.startsWith('/videoUpload')) return 'upload'
    return 'draft'
  }

  const selectedKey = getSelectedKey(location.pathname)


  const handleMenuClick = ({ key }) => {
    if (key === 'home') {
      navigate('/dashboard')
    }
    if (key === 'upload') {
      navigate('/videoUpload')
    }
     if (key === 'draft') {
      navigate('/draftVideo')
    }
  }

  return (
    <Sider
      className="dashboard-sider-left"
      width={256}
      collapsedWidth={80}
      collapsed={collapsed}
      theme="light"
      trigger={null}
      collapsible
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={sidebarItems}
        onClick={handleMenuClick}
        inlineCollapsed={collapsed}
      />
    </Sider>
  )
}

export default AppSidebar
