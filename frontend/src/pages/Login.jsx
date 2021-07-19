import React, { useState, useContext } from 'react'
import Button from '../components/Button'
import { Redirect, NavLink } from 'react-router-dom'
import UserContext from '../UserContext'
export default function Login(){
  const [redictState, setRedirectState] = useState(false)
  const {user, setUser} = useContext(UserContext)

  const url = "http://localhost:3001";
  async function  handleSubmit(e){
    e.preventDefault()
    const {target} = e;

    // console.log(target.userEmail.value)
    // console.log(target.userPassword.value)

    let email = target.userEmail.value;
    let password = target.userPassword.value;

    let body = {
      email,
      password
    }
    try {
      let response = await fetch(`${url}/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      // console.log(response)
      if (response.status != 200) return  alert('something is wrong');

      let token = response.headers.get('imageauth');
      // console.log(token)

      let data = await response.json();
      // console.log(data)

      localStorage.setItem("imageauth", token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(JSON.stringify(data))
      if (response.status == 200){
        setRedirectState(old=>!old)
      }
    } catch(e){
      console.log(e);
      alert(e.message);
    }
  }


  return (
    <div className="w-6/12 pt-11 mx-auto">
      <form className="shadow-md rounded-lg p-4 text-left" onSubmit={(e)=>handleSubmit(e)}>
        <h1 className="text-5xl font-bold p-4 mb-11 text-center">Login</h1>
        <label htmlFor="userEmail" >
          <span>Email</span>
          <input
            name="userEmail"
            id="userEmail"
            className="border-2 focus:border-blue-600 border-gray-400 rounded-xl p-2 block w-full mb-4"
            type="text"/>
        </label>


        <label htmlFor="userPassword" >
          <span>Password</span>
          <input
            name="userPassword"
            id="userPassword"
            className="border-2 focus:border-blue-600 border-gray-400 rounded-xl p-2 block w-full mb-4"
            type="password"/>
        </label>

        <button type='submit'>Login</button>
        <p>Register here:
          <NavLink className="text-pink-600" to="/register" > link</NavLink>
        </p>
        { redictState ? <Redirect push to="/dashboard" /> : null}


      </form>
    </div>
  )
}