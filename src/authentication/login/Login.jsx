import { Flex, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LoginHeader from './components/LoginHeader'
import LoginRightPanel from './components/LoginRightPanel'
import './Login.css'
import { loginRequest } from './loginSlice'

const { Text } = Typography

function Login() {
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, isAuthenticated } = useSelector((state) => state.login)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleFinish = (values) => {
    dispatch(
      loginRequest({
        email: values.email,
        password: values.password,
      }),
    )
  }

  const handleSignUpClick = (event) => {
    event.preventDefault()
    navigate('/register')
  }

  return (
    <Flex className="login-page-root">
      <div className="login-left">
        <LoginHeader />
        <div className="login-main">
          <LoginForm
            form={form}
            loading={loading}
            error={error}
            onFinish={handleFinish}
            onSignUpClick={handleSignUpClick}
          />
        </div>
      </div>
      <LoginRightPanel />
    </Flex>
  )
}

export default Login
