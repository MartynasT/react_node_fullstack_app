import React from 'react';

export default function ImagePin({x, y, number}){
  return (
    <div className="rounded-full h-7 w-7 flex items-center justify-center absolute text-white bg-blue-400 ring ring-blue-400 ring-offset-2"
         style={{left: x, top: y}}
    >
      {number}
    </div>
  )
}