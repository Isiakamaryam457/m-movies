import { useState } from 'react'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
 

  return (
    <div className="flex h-screen bg-black" >
               <div >
               <Sidebar />
               </div>
               
               <main className='flex-1 flex flex-col lg:ml-0'>
                    <Header />
                   <section className='flex-1 overflow-y-auto'><Search /></section>
               </main>
            
               
           </div>
  )
}

export default App;
