import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { authApi } from '../api/authApi'
import { clearAccessToken, setAccessToken } from '../api/tokenStore'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const inFlightRef = useRef(null)

  const refreshAndGetMe = useCallback(async () => {
    if (inFlightRef.current) return inFlightRef.current

    const run = (async () => {
      try {
        const refreshRes = await authApi.refresh()
        setAccessToken(refreshRes?.data?.data?.accessToken)
        const res = await authApi.me()
        if (res?.data?.data?.user) setUser(res.data.data.user)
        else setUser(null)
      } catch {
        clearAccessToken()
        setUser(null)
      } finally {
        setAuthLoading(false)
        inFlightRef.current = null
      }
    })()

    inFlightRef.current = run
    return run
  }, [])

  useEffect(() => {
    refreshAndGetMe()
  }, [refreshAndGetMe])

  const login = useCallback(async (payload) => {
    setAuthLoading(true)
    try {
      const res = await authApi.login(payload)
      setAccessToken(res?.data?.data?.accessToken)
      const nextUser = res?.data?.data?.user ?? null
      setUser(nextUser)
      return res
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const register = useCallback(async (payload) => {
    setAuthLoading(true)
    try {
      const res = await authApi.register(payload)
      setAccessToken(res?.data?.data?.accessToken)
      const nextUser = res?.data?.data?.user ?? null
      setUser(nextUser)
      return res
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      clearAccessToken()
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      authLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      refreshAndGetMe
    }),
    [user, authLoading, login, register, logout, refreshAndGetMe]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

