"use client";
import { faPlus, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Header = ({session}:{session:Session | null}) => {
  return (
    <header className='flex justify-between h-24 items-center px-8 border-b'>
        <Link  href="/" className='text-3xl font-bold text-primary'>Market verse</Link>
        <div className="flex gap-8  *:rounded-md *:px-4 *:py-1 *:font-semibold *:duration-300">
         <Link href="/new" className='bg-primary hover:bg-primary-hover text-white inline-flex items-center gap-2'>
          <FontAwesomeIcon icon={faPlus} className='h-4 w-4' />
          <span>Create a listing</span>
         </Link>
         {
          !session?.user && (
            <>
            <button className='border text-gray-600 border-gray-400 hover:bg-gray-300 hover:text-black inline-flex items-center gap-2 '>Sign up</button>
         <button onClick={()=>signIn("google")} className='border-2 border-primary text-primary hover:bg-primary hover:text-white inline-flex items-center gap-2 '>
         <FontAwesomeIcon icon={faUser} className='h-3' />
          <span>Login</span>
         </button>
            </>
          )
         }
         {
          session?.user && (
            <>
            {
              <Link href="/account">
              <Image src={session.user.image as string} alt='avatar' width={34} height={34} className='rounded-full' />
              </Link>
            }
            </>
          )
         }
        </div>
    </header>
  )
}

export default Header;