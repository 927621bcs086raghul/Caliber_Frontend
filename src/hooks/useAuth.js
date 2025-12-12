import { useEffect, useState } from 'react'
import { checkAuth } from '../api/authApi'

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const verifyAuth = async () => {
      try {
        const data = await checkAuth()
        if (!isMounted) return

        const authenticated =
          typeof data?.authenticated === 'boolean' ? data.authenticated : true

        setIsAuthenticated(authenticated)
        setError(null)
      } catch (err) {
        if (!isMounted) return
        setIsAuthenticated(false)
        setError(err?.response?.data?.message || 'Not authenticated')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    verifyAuth()

    return () => {
      isMounted = false
    }
  }, [])

  return { isAuthenticated, loading, error }
}

export default useAuth
