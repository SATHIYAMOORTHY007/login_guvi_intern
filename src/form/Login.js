import React from 'react'
import '../form/Login.css'
function Login() {
  return (
    <div className="App">
      <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          autoFocus
        />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" autoFocus />

        <button>Log In</button>
      </form>
    </div>
  )
}

export default Login
