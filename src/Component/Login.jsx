import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {

  const [email,setEmail] = useState()
  const [password, setpassword] = useState()

  const handlesubmit = (e) => {
    e.preventDefault()

    const newobj = {
      email,
      password
    }
    console.log(newobj);
    
     
    axios.post("https://reqres.in/api/login",newobj)
    .then((res) => {
      let correct = res.data.token;
      // console.log(correct); 
      let cards = localStorage.setItem('token' , correct)   
    })
    .catch((err) => console.log(err))

  }


  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handlesubmit}>
        <input type='text' placeholder='email'style={{padding : "10px 40px"}} onChange={(e) => setEmail(e.target.value) } /> <br /> <br />
        <input type='password' placeholder='password'style={{padding : "10px 40px"}} onChange={(e) => setpassword(e.target.value) } />  <br /> <br />
        <button>submit</button>
      </form>
    </div>
  )
}

export default Login
