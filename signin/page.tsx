"use client"
import { useState } from 'react';
import Link from 'next/link'
import React from 'react'
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast'
import { redirect, useRouter } from 'next/navigation';
import { SignInRequest } from '@/api/apis'

const defaultValue = {
    email: '',
    password: '',
}

export default function Signin() {
    const router = useRouter();

    const [user, setUser] = React.useState(defaultValue);
    // const [userId, setUserid] = React.useState('')


    const InputfromText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //   console.log(user);
    }

    const SendDetails = async () => {
        try {
            const res = await SignInRequest(user);

            console.log(res?.status);

            // setUserid(res?.data.message._id);

            // console.log(userId);
            Cookies.set('userid', res?.data.message._id);
            toast.success("Successfully logged In");

        } catch (error) {
            console.error("Error while fetching data:", error);
        } finally {
            router.refresh()
            router.push('/')
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 bg-white py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full  sm:max-w-sm">
                    {/* <div className=' flex justify-center '>
                        <Image src="/logo.jpg" alt="logo" width={150} height={100} />
                    </div> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        User Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={(e) => InputfromText(e)}
                                    autoComplete="email"
                                    required
                                    className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={(e) => InputfromText(e)}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full p-5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit" onClick={() => SendDetails()}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>
                        </div>
                    </div>

                    <div className='pb-12 flex justify-center'>
                        <Link href='/signup'>
                            <p className='text-blue-800 mt-6'>{`Don't have a account? create one`}</p>
                        </Link>
                    </div>

                    <div className="bg-gray-400 h-0.5 w-full"></div>

                    <div>
                        <Link
                            href='/admin'
                            type="submit"
                            className="flex w-full mt-12 justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Admin Login
                        </Link>

                    </div>
                </div>
            </div >
        </>
    )
}
