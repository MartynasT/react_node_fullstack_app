import React, {useState} from 'react';
import Button from '../components/Button'
import { Redirect } from 'react-router'

export default function Register(){
  const [redictState, setRedirectState] = useState(false)
  const url = "http://localhost:3001";
  async function  handleSubmit(e){
    e.preventDefault()
    const {target} = e;

    // console.log(target.userEmail.value)
    // console.log(target.userUsername.value)
    // console.log(target.userPassword.value)

    let email = target.userEmail.value;
    let username = target.userUsername.value;
    let password = target.userPassword.value;

    let body = {
      email,
      username,
      password
    }

    let response = await fetch(`${url}/signUp`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    // console.log(response)
    if(response.status != 200) return alert('something is wrong');

    let data = await response.json();
    if (response.status == 200){
      setRedirectState(old=>!old)
    }
  }


  return (
    <div className="w-6/12 pt-11 mx-auto">
      <form className="shadow-md rounded-lg p-4 text-left" onSubmit={(e)=>handleSubmit(e)}>
        <h1 className="text-5xl font-bold p-4 mb-11 text-center">Register</h1>
        <label htmlFor="userEmail" >
          <span>Email</span>
          <input
            name="userEmail"
            id="userEmail"
            className="border-2 focus:border-blue-600 border-gray-400 rounded-xl p-2 block w-full mb-4"
            type="text"/>
        </label>

        <label htmlFor="userUsername" >
          <span>Username</span>
          <input
            name="userUsername"
            id="userUsername"
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

        <button type='submit'>Register</button>
        { redictState ? <Redirect push to="/login" /> : null}

      </form>
    </div>
  )
}