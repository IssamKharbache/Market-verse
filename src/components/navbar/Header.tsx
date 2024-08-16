"use client";
import {
  faFolder,
  faPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SignInBtn from "../auth/SignInBtn";

const Header = ({ session }: { session: Session | null }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header className="flex justify-between h-24 items-center px-4 md:px-8 border-b">
      <Link href="/" className="text-xl md:text-3xl font-bold text-primary">
        Market verse
      </Link>
      <div className="flex items-center gap-8  *:rounded-md *:px-4 *:py-2 *:font-semibold *:duration-300 ">
        <Link
          href="/new"
          className="flex bg-primary hover:bg-primary-hover text-white  items-center gap-2 py-2 px-5"
        >
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          <span className="hidden md:block">Create a listing</span>
        </Link>
        {!session?.user && (
          <>
            <button
              onClick={() => signIn("google")}
              className="flex border-2 border-primary text-primary hover:bg-primary hover:text-white items-center gap-2 py-2 px-5 rounded "
            >
              <FontAwesomeIcon icon={faUser} className="h-3" />
              <span className="hidden md:block">Login</span>
            </button>
          </>
        )}
        {session?.user && (
          <>
            <div className="">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className="block"
              >
                <Image
                  src={session.user.image as string}
                  alt="avatar"
                  width={34}
                  height={34}
                  className={`${showDropdown && "z-50"} rounded-full  relative`}
                />
              </button>
              {showDropdown && (
                <>
                  <div
                    onClick={() => setShowDropdown(false)}
                    className="bg-black/90 fixed inset-0 z-40"
                  ></div>
                  <div
                    className={`absolute z-50 top-20 flex flex-col items-center  w-56 bg-slate-100 mr-16 rounded  overflow-hidden duration-500 ${
                      showDropdown ? "right-0" : "right-96"
                    }`}
                  >
                    <Link
                      onClick={() => setShowDropdown(false)}
                      className=" p-4 flex gap-4 items-center justify-center w-full text-center border-b border-gray-400 hover:bg-slate-200 duration-200"
                      href="/my-listings"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      onClick={() => setShowDropdown(false)}
                      className=" p-4 flex gap-4 items-center justify-center w-full text-center border-b border-gray-400 hover:bg-slate-200 duration-200"
                      href="/my-listings"
                    >
                      <FontAwesomeIcon icon={faFolder} />
                      <span>Listings</span>
                    </Link>
                    <button
                      className="flex gap-4 items-center justify-center p-4 w-full hover:bg-slate-200 duration-200"
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faSignOut} />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
