import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UnauthorizedPage from './pages/UnauthorizedPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import CreateLinkPage from './pages/CreateLinkPage.jsx'
import MyLinksPage from './pages/MyLinksPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />


        <Route
          path="/app/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/create"
          element={
            <ProtectedRoute>
              <CreateLinkPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/links"
          element={
            <ProtectedRoute>
              <MyLinksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}


