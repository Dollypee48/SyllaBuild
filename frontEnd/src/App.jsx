import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { CourseProvider } from './context/CourseContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <AuthProvider>
        <CourseProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 p-6 overflow-auto">
                <AppRoutes />
              </main>
            </div>
          </div>
        </CourseProvider>
      </AuthProvider>
    </Router>
  )
}

export default App