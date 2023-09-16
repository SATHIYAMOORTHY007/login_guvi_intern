import React from 'react'
import '../login/Login.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
function Login() {
  let navigate = useNavigate()
  const myformik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      let errors = {}

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (values.password.length < 6) {
        errors.password = 'Enter valid password'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        let value = await axios.post(
          'https://guvi-intern-back.onrender.com/api/auth/login',
          values,
        )

        let token = value.data.token
        window.sessionStorage.setItem('access_token', token)
        alert('success')
        navigate(`/profile/${value.data.user._id}`)
      } catch (err) {
        if (err.response.status === 404) {
          alert('User not found')
        }
      }
    },
  })

  return (
    <>
      <form onSubmit={myformik.handleSubmit}>
        <h3>Login Here</h3>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={myformik.handleChange}
          values={myformik.values.email}
          className={`form-control ${
            myformik.errors.email ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.email}</span>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={myformik.handleChange}
          values={myformik.values.password}
          className={`form-control ${
            myformik.errors.password ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.password}</span>
        <div className="Link">
          <h3>
            <Link to="/register" className="Link-btn">Register</Link>
          </h3>
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  )
}

export default Login
