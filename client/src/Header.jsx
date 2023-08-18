import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from './LoginContex'

const Header = () => {
  const {user}  = useContext(LoginContext)
  return (
    <header className='flex justify-between'>
        <Link to={'/'} className='flex items-center'>
        <span className='font-bold text-xl'>Courses Project</span>
        </Link>
        <div className='flex gap-2 border border-gray-400 rounded-full py-2 px-4 shadow-md shadow-gray-400'>
          <Link to={"/"}>Firma </Link>
          <div className='border border-l border-gray-400'></div>
          <Link to={"/"}>Kursy</Link>
          <div className='border border-l border-gray-400'></div>
          <Link to={"/contact"}>Kontakt</Link>
        </div>

        <Link to={user?'/account':"/login"} className='flex gap-2 border border-gray-400 rounded-full py-2 px-4'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='relative top-0.5'>
            <line x1="5" y1="7" x2="19" y2="7" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
            <line x1="5" y1="12" x2="19" y2="12" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line><line x1="5" y1="17" x2="19" y2="17" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></line>
          </svg>
          <div className='bg-gray-400 text-white rounded-full border border-gray-500 overflow-hidden'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="7" r="4" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
              <path d="M4 21V17C4 15.8954 4.89543 15 6 15H18C19.1046 15 20 15.8954 20 17V21" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>

      </header>
  )
}

export default Header