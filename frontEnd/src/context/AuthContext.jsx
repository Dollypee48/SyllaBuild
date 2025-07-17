import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

const login = async (email, password) => {
  try {
    const response = await fetch('https://sylla-build.vercel.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      localStorage.setItem('currentUser', JSON.stringify(data))
      setCurrentUser(data)
      toast.success('Logged in successfully!')
      return true
    } else {
      toast.error(data.message || 'Login failed')
      return false
    }
  } catch (error) {
    toast.error('Network error. Please try again.')
    return false
  }
}

const register = async (name, email, password) => {
  try {
    const response = await fetch('https://sylla-build.vercel.app/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      localStorage.setItem('currentUser', JSON.stringify(data))
      setCurrentUser(data)
      toast.success('Account created successfully!')
      return true
    } else {
      toast.error(data.message || 'Registration failed')
      return false
    }
  } catch (error) {
    toast.error('Network error. Please try again.')
    return false
  }
}

  const logout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    toast.success('Logged out successfully!')
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}