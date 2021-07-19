import React from 'react';

export default function Input({type, placeholder, mb}){

  return (
    <input type={type} className={`border-2 focus:border-blue-600 border-gray-400 rounded-xl p-2 block w-full ${mb}`} placeholder={placeholder}/>
  )
}