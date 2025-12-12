import { EyeInvisibleOutlined, LockOutlined, PlayCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const { Title, Text, Link } = Typography

function Login() {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const handleFinish = (values) => {
    // Replace with real submit logic
    // eslint-disable-next-line no-console
    console.log('Login form submitted:', values)
  }

  const handleSignUpClick = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  return (
    <Flex className="login-page-root">
      {/* Left section: form */}
      <div className="login-left">
        {/* Header / Logo */}
        <div className="login-header">
          <div className="login-logo-icon">
            <PlayCircleOutlined />
          </div>
          <Title level={4}>
            VideoConnect
          </Title>
        </div>

        {/* Main form content */}
        <div className="login-main">
          <div className="login-title-block">
            <Title level={2}>
              Welcome Back
            </Title>
            <Text type="secondary" className="login-subtitle">
              Enter your details to access your dashboard.
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            size="large"
            requiredMark={false}
          >
            {/* Email */}
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' },
              ]}
            >
              <Input
                placeholder="name@example.com"
                prefix={<UserOutlined className="login-icon-muted" />}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                placeholder="••••••••"
                iconRender={(visible) => (
                  <EyeInvisibleOutlined
                    className="login-icon-muted"
                    rotate={visible ? 180 : 0}
                  />
                )}
                prefix={<LockOutlined className="login-icon-muted" />}
              />
            </Form.Item>

            <div className="login-forgot-row">
              <Link href="#">Forgot Password?</Link>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              className="login-primary-button"
            >
              Log In
            </Button>
          </Form>

         
        </div>

        {/* Footer */}
        <Text type="secondary" className="login-footer">
          Don&apos;t have an account?{' '}
          <Link href="#" onClick={handleSignUpClick}>Sign up</Link>
        </Text>
      </div>

      {/* Right section: image / marketing */}
      <div className="login-right">
        <div className="login-right-image" />

        {/* Gradient overlay */}
        <div className="login-right-gradient" />

        {/* Text overlay */}
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
    </Flex>
  )
}

export default Login
