import { Flex, Form, Typography } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Register.css'
import { registerRequest } from './RegisterSlice'
import RegisterForm from './components/RegisterForm'
import RegisterHeader from './components/RegisterHeader'
import RegisterHero from './components/RegisterHero'

const { Text } = Typography

function Register() {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { loading, error, user } = useSelector((state) => state.register)

  useEffect(() => {
    if (user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleFinish = (values) => {
    dispatch(
      registerRequest({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    )
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  return (
    <div className="register-root">
      <RegisterHeader onLoginClick={handleLoginClick} />

      <div className="register-main">
        <Flex className="register-main-inner">
          <RegisterHero />

          <RegisterForm
            form={form}
            loading={loading}
            error={error}
            onFinish={handleFinish}
          />
        </Flex>
      </div>
    </div>
  )
}

export default Register
