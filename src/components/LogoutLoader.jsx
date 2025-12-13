import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import './LogoutLoader.css'

function LogoutLoader() {
  const { loading } = useSelector((state) => state.logout || {})

  if (!loading) {
    return null
  }

  return (
    <div className="logout-loader-overlay">
      <Spin size="large" tip="Logging out..." />
    </div>
  )
}

export default LogoutLoader
