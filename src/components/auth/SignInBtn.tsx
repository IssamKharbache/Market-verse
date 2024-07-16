"use client";
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signIn } from 'next-auth/react'
import React from 'react'

const SignInBtn = () => {
  return (
    <button
    onClick={() => signIn("google")}
    className=" hidden md:flex border-2 border-primary text-primary hover:bg-primary hover:text-white items-center gap-2 py-2 px-5 rounded "
  >
    <FontAwesomeIcon icon={faUser} className="h-3" />
    <span>Login</span>
  </button>
  )
}

export default SignInBtn