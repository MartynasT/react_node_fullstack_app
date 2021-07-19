import React, {useEffect, useState, useContext} from 'react';
import Button from '../components/Button'
import Card from '../components/Card'

import { FolderAddIcon } from '@heroicons/react/solid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink, Redirect,
} from 'react-router-dom'
import MainWrapper from '../components/Main'
import UserContext from '../UserContext'

export default function Dashboard(){
  const url = "http://localhost:3001";
  let token='';
  const {user, userImages, setUserImages} = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // const [userImages, setUserImages] = useState(null)
  // const userData = JSON.parse(localStorage.getItem('user'))
  // useEffect(()=>{
  //   const userDataRaw = localStorage.getItem('user')
  //   const userData = JSON.parse(userDataRaw)
  //   // setUserData(userData)
  // },[])

  useEffect(()=>{
    token = localStorage.getItem('imageauth')
    if (token){
      getAllUserImages();
    }

  },[token])

  const getAllUserImages = async ()=>{
    let response = await fetch(`${url}/myImages`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'imageauth': token
      }
    })
    let data = await response.json();
    if(data){
      setLoading((oldValue)=>!oldValue)
    }
    setUserImages(data);
  }






  const Btntext = 'Upload Image';
  return (
    <section className="max-w-screen-xl mx-auto pt-6 grid-cols-12 grid gap-5 border-1">
      <NavLink  to='addImage' className="col-span-3 border border-blue-600 p-4 flex flex-col items-center bg-blue-600 rounded-lg">
        <h3 className="text-white font-semibold">Add new</h3>
        <FolderAddIcon className="h-16 w-16 text-white ml-2"/>
      </NavLink>
      {/*<Link to="/image1"><Card /></Link>*/}
      {
        userImages.map((item)=>{
          return (
            <NavLink key={item._id} className="col-span-3 border-2 border-gray-200 p-4 h-44 rounded-lg"
                     to={{
                       pathname:`/images/${item._id}`,
                       imageData:{
                         id: item._id,
                         imgUrl: item.image
                       }
                     }}
            >
              <Card key={item._id} image={item.image} commentsCount={item.imageComments.length}/>
            </NavLink>
          )
        })
      }

      {user ? null : <Redirect push to="/" />}

    </section>
  )
}