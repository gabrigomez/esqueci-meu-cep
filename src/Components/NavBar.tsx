import { RiEmotionSadLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BsInfoCircleFill } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsMoonFill } from 'react-icons/bs';

import { useTheme } from '../useTheme.js';

export const NavBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className='flex justify-center items-center w-full h-16 border border-b-slate-200'>
      <Link to='/about' className="absolute top-4 left-5 font-raleway">
        <div className='flex items-center hover:opacity-80 duration-300'>
          <BsInfoCircleFill className='mr-1' />
          <p>
            Sobre
          </p>
        </div>
      </Link>
      <Link to='/' className='flex justify-self-center'>
        <RiEmotionSadLine className='text-5xl'/>
        <p className='font-julee font-semibold text-md'>
          ESQUECI MEU CEP!
        </p>
      </Link>
      <BsSun 
        className={`text-white cursor-pointer ${theme ? '' : 'hidden'} 
        text-lg xl:text-2xl absolute top-4 right-5`} 
        onClick={() => setTheme(!theme)} />
      <BsMoonFill 
        className={`text-primary cursor-pointer ${theme ? 'hidden' : ''} 
        text-lg xl:text-2xl absolute top-4 right-5`} 
        onClick={() => setTheme(!theme)} />
    </nav>
  )
}