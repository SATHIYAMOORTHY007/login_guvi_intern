import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function Update() {
  // logout
  const navigator = useNavigate()
  const logout = () => {
    window.sessionStorage.clear('access_token')
    navigator('/')
  }
  let param = useParams()
  useEffect(() => {
    getData()
  }, [])

  let getData = async () => {
    /* get user date  */
    let user = await axios.get(
      `https://guvi-intern-back.onrender.com/api/auth/getuser/${param.id}`,
    )
    console.log(user.data.message)
    setName(user.data.message.name)
    setAge(user.data.message.age)
    setEmail(user.data.message.email)
    setPhone(user.data.message.phone)
    setDate(user.data.message.dateofbirth.slice(0, 10))
  }
  let courseOption = [
    { id: 1, course: 'React' },
    { id: 2, course: 'Html' },
    { id: 3, course: 'Css' },
    { id: 4, course: 'Javascript' },
  ]
  let genderOption = [
    { id: 1, gen: 'Male' },
    { id: 2, gen: 'Female' },
  ]
  let [course, setCourse] = useState('React')
  let [date, setDate] = useState('')
  let [gender, setGender] = useState('Male')
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [age, setAge] = useState('')
  let [phone, setPhone] = useState('')
  const submit = async () => {
    let data = {}
    data.course = course
    data.name = name
    data.age = age
    data.gender = gender
    data.email = email
    data.phone = phone
    data.date = date
    console.log(date)
    if (phone) {
      if (!/^\+?[1-9][0-9]{7,14}$/i.test(phone)) {
        return alert('Invalid phone number')
      }
    }

    if (date) {
      let pattern = /^(?:\d{4})-(?:\d{2})-(?:\d{2})$/
      if (!pattern.test(date)) {
        return alert('Invalid date')
      }
    }

    /* updated user input */
    let userUpadte = await axios.post(
      `https://guvi-intern-back.onrender.com/api/auth/updateuser/${param.id}`,
      data,
    )

    if (('update', userUpadte.data.message)) {
      alert('sucessfully updated')
    }
  }
  return (
    <>
      <form>
        <h3>Profile</h3>
        {/*  name input */}

        <input type="text" placeholder="Name" id="name" value={name} />

        {/* email */}

        <input type="email" placeholder="Email" id="email" value={email} />

        {/* age */}

        <input
          type="number"
          placeholder="Age"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* phoneno password */}

        <input
          type="phoneno"
          placeholder="Phone No"
          id="phoneno"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* course */}
        <select
          id="format"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          {courseOption.map((value, id) => (
            <option key={id}>{value.course}</option>
          ))}
        </select>
        {/* gender */}
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          {genderOption.map((value, id) => (
            <option key={id}>{value.gen}</option>
          ))}
        </select>
        <input
          type="date"
          name="bday"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="button" onClick={submit}>
          Update
        </button>
        <button type="button" id="logout" onClick={logout}>
          Logout
        </button>
      </form>
    </>
  )
}

export default Update
