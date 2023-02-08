import * as React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';


export const NavBar = () => {
  return (
    <nav className='flex items-center justify-center w-full h-16 border border-b-slate-200'>
      <div className='flex'>
        <RiEmotionSadLine className='text-4xl mr-1'/>
        <p className='font-shadows font-bold text-md'>
          Esqueci meu CEP!
        </p>
      </div>
    </nav>
  )
}