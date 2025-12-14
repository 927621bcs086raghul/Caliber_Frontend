import { EyeInvisibleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'

const { Text, Link } = Typography

function LoginForm({ form, loading, error, onFinish, onSignUpClick }) {
  return (
    <>
      <div className="login-title-block">
        <Typography.Title level={2}>
          Welcome Back
        </Typography.Title>
        <Text type="secondary" className="login-subtitle">
          Enter your details to access your dashboard.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        size="large"
        requiredMark={false}
      >
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

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
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

        {error && (
          <Text type="danger" className="login-error-text">
            {error}
          </Text>
        )}

        <Button
          type="primary"
          htmlType="submit"
          block
          className="login-primary-button"
          loading={loading}
        >
          Log In
        </Button>
      </Form>

      <Typography.Text type="secondary" className="login-footer">
        Don&apos;t have an account?{' '}
        <Link href="#" onClick={onSignUpClick}>Sign up</Link>
      </Typography.Text>
    </>
  )
}

export default LoginForm
