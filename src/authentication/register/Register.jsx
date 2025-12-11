import { LockOutlined, MailOutlined, PlayCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Checkbox, Flex, Form, Input, Typography } from 'antd'
import './Register.css'

const { Title, Text } = Typography

function Register() {
  const [form] = Form.useForm()

  const handleFinish = (values) => {
    // Replace with real submit logic
    // eslint-disable-next-line no-console
    console.log('Register form submitted:', values)
  }

  return (
    <div className="register-root">
      {/* Top navigation */}
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
          <Button className="register-header-button">Login</Button>
        </div>
      </header>

      {/* Main content */}
      <div className="register-main">
        <Flex className="register-main-inner">
          {/* Left hero / visual */}
          <div className="register-hero">
            <div className="register-hero-image" />
            <div className="register-hero-gradient" />

            <div className="register-hero-content">
              <div className="register-hero-icon-box">
                <PlayCircleOutlined className="register-hero-icon" />
              </div>
              <div>
                <h1 className="register-hero-title">
                  Connect deeply.
                  <br />
                  Stream freely.
                </h1>
                <p className="register-hero-text">
                  Join the world&apos;s most vibrant community for real-time video sharing. Experience ultra-low
                  latency and crystal clear quality designed for creators.
                </p>
              </div>

              <div className="register-hero-meta">
                <div className="register-hero-avatars">
                  <Avatar
                    size={40}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACEx2AgUW6MpYkW9jJlwq2BOqk3SmMYmOR953GzdMyXNDksKE9_lo--9ePQC3udtJRG7ITZAru5ms8ATTaIjkJZ1Lw8VR4cWpmktBnKNFnvJEwsE_K2VSDJ-D5siSWJeKxO3NVliXXqx0xQDoycF4nLP2N2j-Wlrkg4VIBmndcAyfhGjaavAmj0Vm1yMVUWbeMzpeEj63FicTSmXY4O3zpahjrcVHWqlbiGNi_C6iOQB17XKDAzwpLOL42E35Tf2HnOv0XVGD851k"
                    alt="Creator avatar 1"
                  />
                  <Avatar
                    size={40}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABGrwLjliQHFiY3afRMnXE-n4jvusL_uhf8Owr4ZpzqZX0qiMmPtFFn1KwsOylaJwOM0SaBpDRRjFbDoKy4pQ0XwL74BloL00vcQSBdCPNPG_TYuSN77sqKB0NyaezRVwCilms6NlWd5yjF8RZUikcqN3TOg-gm1nxOZSt9_vkRwMUvN1sNYu2gqke6WYU3bGN0Ql-5xLrb6WKbU_oaIXXK82YDJssayWINv9zLYBUa5hw8-u8bc5dMRLvSQAYMKoR2qEj2-1wP38"
                    alt="Creator avatar 2"
                  />
                  <Avatar
                    size={40}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNN8f4Sgy81lxtU6BR0xRmusNaEXmAi2VbmuWGzja3dSb8VrH30u2WZxkJMdk8xB-nms6hfi1qT5bJJXHl86bM4aeK7ukudTdqCU0mW0_Se_rzqL5fWoycEH8zReHSWKCb_hl8JpFREOSLruxit9k7m93wF3H0vFNp-NyxEiSmdeXiv0B__XYvQuJ6wFh423xrJo1uXbr1PoQbdgfKsg2Gop6qqR3xUZu8KIYvXV67wbTVRfFPIiuTAmUkDNicLdPUg2s5us5sIG4"
                    alt="Creator avatar 3"
                  />
                  <div className="register-hero-more">+2k</div>
                </div>
                <div className="register-hero-meta-text">Creators joined today</div>
              </div>
            </div>
          </div>

          {/* Right form */}
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
                onFinish={handleFinish}
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
                    rules={[{ required: true, message: 'Please enter your password' }]}
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
                >
                  Register Account
                </Button>

              </Form>
            </div>
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default Register
