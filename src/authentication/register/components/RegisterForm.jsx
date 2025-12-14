import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'

const { Title, Text } = Typography

function RegisterForm({ form, loading, error, onFinish }) {
  return (
    <div className="register-form-wrapper">
      <div className="register-form-inner">
        <div className="register-form-header">
          <Title level={2} className="register-form-title">
            Create your account
          </Title>
          <Text className="register-form-subtitle">
            Start sharing and connecting in real-time today.
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="register-form"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined />}
            />
          </Form.Item>

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
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <div className="register-form-row">
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
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Confirm"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: 'Please confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('Passwords do not match'))
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="••••••••"
                prefix={<LockOutlined />}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[{
              validator(_, value) {
                if (value) return Promise.resolve()
                return Promise.reject(new Error('You must agree to the terms to continue'))
              },
            }]}
          >
            <Checkbox>
              <Text>
                I agree to the{' '}
                <a href="#">Terms of Service</a> and{' '}
                <a href="#">Privacy Policy</a>
              </Text>
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="register-submit-button"
            loading={loading}
          >
            Register Account
          </Button>

          {error && (
            <Text type="danger" className="register-error-text">
              {error}
            </Text>
          )}
        </Form>
      </div>
    </div>
  )
}

export default RegisterForm
