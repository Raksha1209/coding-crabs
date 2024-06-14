"use client"

import { getAllUniversityProject } from "@/api/apis";
import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import Link from "next/link";



const Page = () => {
  const id = Cookies.get('collageid');
  const [projects, setProjects] = useState<any[]>([])


  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const res = await getAllUniversityProject(id);
      setProjects(res?.data)
      console.log(res?.data);


    } catch (err) {
      console.log("error in getting the university Projects");
    }
  }

  return (
    <div className="bg-black flex justify-center items-center">
      <div className=" py-24 sm:px-6 w-4/5 sm:py-32 lg:px-8 h-screen space-y-6">

      {
      projects?.map((item: any, i: number) => {
        return (
          <div key={i} className="flex flex-col justify-center items-center">
              <div className="w-full md:w-4/5 flex  flex-col md:flex-row justify-between border bg-white rounded-md">
                <div className="font-medium text-xs text-center md:text-xl mt-3 ">
                  <p className="p-2">{item.title}</p>
                </div>

                <div className="mt-5 text-xs md:text-sm underline text-blue-500 border text-center">
                  <p>See Project</p>
                </div>

                <div className="flex gap-5 mr-5 p-2 justify-center  md:p-4 font-bold">
                  <button className="bg-blue-500 p-2 rounded-md">Reject</button>
                  <button className="bg-blue-500 p-2 rounded-md">Accept</button>
                </div>
              </div>
          </div>
        );
  })
}

     

      </div>
    </div>

  )
}

export default Page