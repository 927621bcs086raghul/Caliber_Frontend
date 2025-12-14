import { PlayCircleOutlined } from '@ant-design/icons'
import { Typography } from 'antd'

const { Title } = Typography

function LoginHeader() {
  return (
    <div className="login-header">
      <div className="login-logo-icon">
        <PlayCircleOutlined />
      </div>
      <Title level={4}>
        VideoConnect
      </Title>
    </div>
  )
}

export default LoginHeader
