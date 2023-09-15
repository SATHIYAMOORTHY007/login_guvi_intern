import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
function Register() {
  let nav = useNavigate()
  const myformik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: (values) => {
      let errors = {}
      if (!values.email) {
        errors.email = 'please enter email'
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (values.name.length < 4) {
        errors.name = 'please enter name'
      }

      if (values.password.length < 6) {
        errors.password = 'A minimum 6 characters password '
      }
      if (values.cpassword !== values.password) {
        errors.cpassword = 'does not match'
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        let userReg = await axios.post(
          'https://guvi-intern-back.onrender.com/api/auth/register',
          values,
        )
        alert('success')
        nav('/')
      } catch (err) {
        alert(err)
      }
    },
  })
  return (
    <>
      <form onSubmit={myformik.handleSubmit}>
        <h3>Register Here</h3>
        {/*  name input */}

        <input
          type="text"
          placeholder="name"
          id="name"
          onChange={myformik.handleChange}
          values={myformik.values.name}
          className={`form-control ${
            myformik.errors.name ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.name}</span>
        {/* email */}

        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={myformik.handleChange}
          values={myformik.values.email}
          className={`form-control ${
            myformik.errors.email ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.email}</span>
        {/* password */}

        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={myformik.handleChange}
          values={myformik.values.password}
          className={`form-control ${
            myformik.errors.password ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.password}</span>
        {/* confirm password */}

        <input
          type="cpassword"
          placeholder="confirm-password"
          id="cpassword"
          onChange={myformik.handleChange}
          values={myformik.values.cpassword}
          className={`form-control ${
            myformik.errors.cpassword ? 'is-invalid' : 'is-valid'
          }`}
        />
        <span>{myformik.errors.cpassword}</span>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Register
