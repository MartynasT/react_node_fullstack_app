import React from 'react';

export default function Card({image,commentsCount}){

  return (
    <div className="h-full">
      <img src={image} alt="" className="block h-full w-full object-cover"/>
      <h2>{commentsCount}</h2>
    </div>
  )
}