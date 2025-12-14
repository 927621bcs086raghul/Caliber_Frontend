import { Tag, Typography } from 'antd'

const { Title, Text } = Typography

function LoginRightPanel() {
  return (
    <div className="login-right">
      <div className="login-right-image" />
      <div className="login-right-gradient" />
      <div className="login-right-content">
        <Tag className="login-badge">
          <span className="login-badge-dot" />
          Live Streaming
        </Tag>

        <Title level={2} className="login-right-title">
          Connect with your audience in real-time.
        </Title>
        <Text className="login-right-text">
          Experience seamless video communication and high-quality streaming tailored for professionals.
        </Text>
      </div>
    </div>
  )
}

export default LoginRightPanel
