import React, {useContext, useState, useEffect} from 'react';
import Button from './Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import HomePage from '../pages/HomePage'
import MainWrapper from './Main'
import Dashboard from '../pages/Dashboard'
import UserContext from '../UserContext'


export default function Header(){
  const url = "http://localhost:3001";
  const [token, setToken] = useState()
  const {user, setUser} = useContext(UserContext)
  // console.log(user)

  useEffect(()=>{
    const item = localStorage.getItem('imageauth');
    const userItem = localStorage.getItem('user');
    setToken(item)
    setUser(userItem)
  },[user])

  const logOut = async () =>{
    let response = await fetch(`${url}/logOut`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'imageauth': token
      }
    })
    console.log(await response.json())

    localStorage.removeItem('imageauth');
    localStorage.removeItem('user');
    setUser(null)
    // window.location.href = './login.html';
  }

  return(
      <header className="py-5 shadow-md">
        <div className="container max-w-screen-xl mx-auto flex items-center	justify-between">
            <div className="left">
              <NavLink to="/">Logo</NavLink>
            </div>
            <div className="right flex items-center">
              {(user !== null) ? <NavLink to="/dashboard"><button>Dashboard</button></NavLink> : null}
              {(user !== null) ?
                <button className='ml-10' onClick={logOut}>Log out</button>:
                <NavLink to="/login"><Button  size="small" onClic> Log in </Button></NavLink>
              }

            </div>
        </div>
      </header>

  )
}