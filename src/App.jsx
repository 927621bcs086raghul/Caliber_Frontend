import { Suspense, lazy } from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import LogoutLoader from './components/LogoutLoader'
import useAuth from './hooks/useAuth'
const Login = lazy(() => import('./authentication/login/Login'))
const Register = lazy(() => import('./authentication/register/Register'))
const Dashboard = lazy(() => import('./authentication/dashboard/Dashboard'))
const VideoUpload = lazy(() => import('./authentication/videoUpload/VideoUpload'));
const ProfileDetails = lazy(() => import('./authentication/profileDetails/ProfileDetails'));
const  VideoPlayer = lazy(() => import('./authentication/videoStream/videoPlayer'))
const VideoStream = lazy(() => import('./authentication/videoStream/VideoStream'));
function PrivateRoute({ component }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading || isAuthenticated === null) {
    return <div>Loading...</div>
  }
  console.log('PrivateRoute rendered, isAuthenticated:', isAuthenticated)
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
      <LogoutLoader />
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
          <Route
          path='/videoUpload'
          element={<PrivateRoute component={<VideoUpload />} />}
          />
          <Route
          path='/videoUpload'
          element={<PrivateRoute component={<VideoUpload />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute component={<ProfileDetails />} />}
          />
           <Route
            path="/video/:id"
            element={<PrivateRoute component={<VideoPlayer/>} />}/>
          <Route
            path="/videos/:id"
            element={<PrivateRoute component={<VideoStream />} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />

         </Routes>
       </Suspense>
     </Router>
  )
}

export default App
