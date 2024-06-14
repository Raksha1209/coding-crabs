"use client"

import { SignUpRequest } from '@/api/apis';
import Link from 'next/link'
import React from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const defaultValue = {
    fullname: '',
    email: '',
    password: '',
}

export default function Signup() {

    const router = useRouter();

    const [user, setUser] = React.useState(defaultValue)

    const InputfromText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //   console.log(user);
    }

    const SendDetails = async () => {
        try {
            const res = await SignUpRequest(user);
            toast.success("Successfully Sign Up");
        } catch (err: any) {
            console.log("Error in sign up", err);
        }finally{
            router.push('/signin')
        }
        // setUserid(res?.data.message._id);
        // console.log(userId)
        //    await StoreCookies();
    }

    return (
        <>
            {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <div className=' flex justify-center '>
                        <Image src="/logo.jpg" alt="logo" width={150} height={100} />
                    </div> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Signup
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="user-name"
                                    name="fullname"
                                    type="fullname"
                                    autoComplete="fullname"
                                    onChange={(e) => InputfromText(e)}
                                    required
                                    className="block w-full rounded-md border-0 p-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={(e) => InputfromText(e)}
                                    required
                                    className="block w-full rounded-md border-0 p-5  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={(e) => InputfromText(e)}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 p-5  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit" onClick={() => SendDetails()}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    <div className=' flex justify-center'>
                        <Link href='/signin'>
                            <p className='text-blue-800 mt-6'>{`Already have a account? Sign In`}</p>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}
