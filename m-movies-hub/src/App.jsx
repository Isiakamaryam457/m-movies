import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Favorites from './components/Favorites'

function App() {
 

  return (
    <BrowserRouter>
    <div className="flex h-screen bg-black" >         
               <Sidebar />
               <main className='flex-1 flex flex-col lg:ml-0'>
                    <Header />
                   <section className='flex-1 overflow-y-auto'>
                   <Routes>
                    <Route path="/" element={<Search />}/>
                    <Route path="/movies" element={<Search />} />
                    <Route  path="/watchlist" element={<div className="text-white p-4">Watchlist coming soon...</div>} />
                    <Route path="/favorites" element={<Favorites />} />
                   </Routes>
                   </section>
               </main>
            
               
           </div>
           </BrowserRouter>
  )
}

export default App;
