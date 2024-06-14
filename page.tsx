import { Component, useState } from 'react'


import Dashboard from '@/components/dashboard/dashboard'
export default async function Home() {


  return (
    <main>
     <div className="flex  justify-center items-center">
           <Dashboard />
      </div>
    </main>
  )
}
