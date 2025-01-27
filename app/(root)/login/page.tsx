"use client"
import { AppDispatch } from '@/app/state/store'
import { loginUser } from '@/app/state/user/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const login = async (event: any) => {
    try {
      event.preventDefault()
      const response = await dispatch(loginUser({ name: username, password }))
      if (response.meta.requestStatus === "fulfilled") {
        router.push("/")
      } else {
        console.log({ loginError: response.payload })
      }
    } catch (error) {
      console.log({ loginError: error })
    }
  }

  useEffect(() => {
    console.log("welcim")

  }, [])


  return (

    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8" >
      <div className="mx-auto max-w-lg shadow-lg pt-8">
        <h1 className="text-center text-2xl font-bold text-slate-600 sm:text-3xl">Login to your Account.</h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Welcome back! <br /> Log in to jump right back into the action!
        </p>

        <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium text-slate-800">Log In </p>


          <div>
            <label htmlFor="username" className="sr-only">Email</label>

            <div className="relative">
              <input
                type="username"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-3.313 0-6 2.686-6 6v1h12v-1c0-3.314-2.687-6-6-6z"
                  />
                </svg>
              </span>

            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="Enter password"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => login(e)}
            className="block w-full rounded-lg bg-green-900 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link className="underline ml-2" href="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div >
  )
}
