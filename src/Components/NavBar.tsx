import { RiEmotionSadLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BsInfoCircleFill } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsMoonFill } from 'react-icons/bs';

import { useTheme } from '../useTheme.js';

export const NavBar = () => {
  const { theme, setTheme } = useTheme();
  console.log(theme)

  return (
    <nav className='flex justify-center items-center w-full h-16 border-b border-b-slate-200 dark:border-b-slate-800'>
      <Link to='/about' className="absolute top-4 left-5 dark:text-white font-raleway">
        <div className='flex items-center hover:opacity-80 duration-300'>
          <BsInfoCircleFill className='mr-1 dark:text-white' />
          <p className='dark:text-white'>
            Sobre
          </p>
        </div>
      </Link>
      <Link to='/' className='flex justify-self-center'>
        <RiEmotionSadLine className='text-5xl dark:text-white '/>
        <p className='font-julee font-semibold text-md dark:text-white '>
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