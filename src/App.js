import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './form/login/Login'
import Register from './form/register/Register'
import Update from './form/update/Update'

function App() {
  function Auth({ children }) {
    const token = window.sessionStorage.getItem('access_token')

    if (!token) {
      return <Navigate to="/" />
    } else {
      return children
    }
  }
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/profile/:id"
        element={
          <Auth>
            <Update />
          </Auth>
        }
      />
    </Routes>
  )
}

export default App
