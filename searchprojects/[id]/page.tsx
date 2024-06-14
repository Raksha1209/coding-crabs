"use client"
import { getProjectDeatils } from '@/api/apis'
import Image from 'next/image'
import { useEffect } from 'react'



const Page = ({ params }:any) => {
  
  // console.log(params.id)

useEffect(() => {
  getProject();
}, [])

const getProject = async() =>{
  try{
    const res = await getProjectDeatils(params.id);
    console.log(res)
  }catch(err:any){
    console.log("Error in geting the project details",err);
  }
}



  return (
    <div className='bg-black flex justify-center items-center h-full'>
          <div className=" md:w-[1024px] font-sans  text-white pb-8 bg-gray-900/40 p-4" >
            <div className='flex justify-start md:mt-5 md:ml-5'>
              <p className=' rounded-full bg-blue-800/70 p-1 text-sm text-green-300'>Pending</p>
            </div>
            <div className='flex justify-center'>
              <h1 className='text-5xl   font-semibold'>Project Title</h1>
            </div>

            <div className=' mt-8 flex justify-center items-center'>
               <Image src='/project.jpg' alt="Image" width={600} height={200} />
            </div>

            <div className='flex flex-col justify-center items-center mt-4'>
              <div className='flex justify-start  w-full'>
                 <p className='font-semibold'>Short description:</p>
              </div>

              <div className='w-4/5 mt-2'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam totam odio consequatur voluptate cum, est reiciendis aut soluta maiores magnam laborum suscipit ipsam aliquam, incidunt facere dignissimos quia adipisci cupiditate?</p>
              </div>

            </div>

            <div className='flex flex-col justify-center items-center mt-4'>
              <div className='flex justify-start  w-full'>
                 <p className='font-semibold'>description:</p>
              </div>

              <div className='w-4/5 mt-2'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam totam odio consequatur voluptate cum, est reiciendis aut soluta maiores magnam laborum suscipit ipsam aliquam, incidunt facere dignissimos quia adipisci cupiditate?</p>
              </div>

            </div>

            <div className='flex flex-col justify-center items-center mt-4'>
              <div className='flex justify-start  w-full'>
                 <p className='font-semibold'>Teck Stack:</p>
              </div>

              <div className='w-4/5 mt-2'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam totam odio consequatur voluptate cum, est reiciendis aut soluta maiores magnam laborum suscipit ipsam aliquam, incidunt facere dignissimos quia adipisci cupiditate?</p>
              </div>

            </div>
 

         </div>
    </div>
  )
}

export default Page