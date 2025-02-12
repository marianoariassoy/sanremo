import { createContext, useState, useContext, useEffect, ReactNode } from 'react'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
// import { jwtDecode } from 'jwt-decode'

interface UserData {
  id: number
  email: string
  name: string
  role: string
}

interface AuthContextType {
  isLoggedIn: boolean
  login: (token: UserData) => void
  logout: () => void
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData>({ id: 0, email: '', name: '', role: '' })

  const login = (token: UserData) => {
    setCookie('token-sanremo', JSON.stringify(token), { expires: 3 })
    // const decode = jwtDecode(token)
    const decode = token
    setUserData(decode)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserData({ id: 0, email: '', name: '', role: '' })
    removeCookie('token-sanremo')
  }

  useEffect(() => {
    const token = getCookie('token-sanremo')

    if (token) {
      const parse = JSON.parse(token)
      login(parse)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData, setUserData }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
