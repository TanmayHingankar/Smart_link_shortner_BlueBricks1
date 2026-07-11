import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  const refreshAndGetMe = useCallback(async () => {
    try {
      // Backend uses httpOnly refresh cookie; we can attempt refresh then read /me.
      await authApi.refresh()
      const res = await authApi.me()
      if (res?.data?.success) setUser(res.data.data.user)
      else if (res?.data?.data?.user) setUser(res.data.data.user)
      else setUser(null)
    } catch {
      setUser(null)
    } finally {
      setAuthLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshAndGetMe()
  }, [refreshAndGetMe])

  const login = useCallback(async (payload) => {
    setAuthLoading(true)
    try {
      const res = await authApi.login(payload)
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

