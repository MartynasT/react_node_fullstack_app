import React from 'react';
import { UserIcon } from '@heroicons/react/solid'

export default function Button({size, style, children }){

  let sizeStyles = '';
  let colorStyle = ''

  switch (size){
    case 'small':
      sizeStyles = 'text-xs py-1.5 px-4 rounded-lg font-medium'
      break;
    case 'medium':
      sizeStyles = 'text-base py-2 px-5 rounded-xl font-semibold';
      break;
    case 'large':
      sizeStyles = 'text-xl py-2.5 px-7 rounded-2xl font-semibold';
      break;
    default:
      sizeStyles = 'text-base py-2 px-5 rounded-xl font-semibold';
  }

  switch (style){
    case 'cancel':
      colorStyle = 'text-red-500 hover:bg-gray-200';
      break;
    case 'login':
      colorStyle = 'mx-auto border-2 border-blue-600 bg-blue-600' +
        ' hover:bg-white hover:text-blue-600 text-white';
      break;
    default:
      colorStyle = 'border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 text-white '
  }

  return(
    <>

      <button type="button" className={`${sizeStyles} ${colorStyle} mx-2 uppercase flex items-center transition-colors duration-300`}>
        <span>{children}</span>
        {/*<UserIcon className="h-5 w-5 text-white ml-2"/>*/}
      </button>
    </>
  )
}