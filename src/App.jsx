import { Suspense, lazy } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import useAuth from './hooks/useAuth'

const Login = lazy(() => import('./authentication/login/Login'))
const Register = lazy(() => import('./authentication/register/Register'))
const Dashboard = lazy(() => import('./authentication/dashboard/Dashboard'))

function PrivateRoute({ component }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading || isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return component
}

function PublicRoute({ component }) {
  console.log('PublicRoute rendered')
   const { isAuthenticated } = useAuth()



  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return component
}

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={<PublicRoute component={<Login />} />}
          />
          <Route
            path="/register"
            element={<PublicRoute component={<Register />} />}
          />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={<Dashboard />} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
