import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types/users'

interface AuthContextType {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  userData: User
  setUserData: React.Dispatch<React.SetStateAction<User>>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<User>({ id: 0, name: '', user: '', role: '' })

  const login = (token: string) => {
    setCookie('sanremo', token)
    const decode = jwtDecode<User>(token)
    setUserData(decode)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserData({ id: 0, name: '', user: '', role: '' })
    removeCookie('sanremo')
  }

  useEffect(() => {
    const token = getCookie('sanremo')

    if (token) {
      login(token)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData, setUserData }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
