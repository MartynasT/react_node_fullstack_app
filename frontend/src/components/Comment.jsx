import React from 'react';

export default function Comment({x,y, number, comment}){

  return (
    <div className="mx-4 mb-8 pb-5 px-5 pt-12 py-5 shadow  border border-gray-200	rounded-md relative" >
      <div className="rounded-full h-8 w-8 flex items-center justify-center absolute text-white bg-blue-400 comment-number">
        {number}
      </div>
      <p className="text-left text-base">{comment}</p>
    </div>
  )
}