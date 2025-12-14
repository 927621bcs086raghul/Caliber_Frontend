import { PlayCircleOutlined } from '@ant-design/icons'
import { Button, Typography } from 'antd'

const { Title } = Typography

function RegisterHeader({ onLoginClick }) {
  return (
    <header className="register-header">
      <div className="register-header-left">
        <div className="register-logo-icon">
          <PlayCircleOutlined />
        </div>
        <Title level={4} className="register-logo-title">
          StreamConnect
        </Title>
      </div>
      <div className="register-header-right">
        <span className="register-header-text">Already a member?</span>
        <Button className="register-header-button" onClick={onLoginClick}>
          Login
        </Button>
      </div>
    </header>
  )
}

export default RegisterHeader
