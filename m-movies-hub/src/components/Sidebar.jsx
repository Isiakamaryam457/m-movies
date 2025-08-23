import React, { useState } from 'react';
import { FaVideo, FaPlus, FaHeart, FaBars, FaTimes, FaPlayCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useFavoritesStore from './stores/favoritesStore';


export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const favoritesCount = useFavoritesStore((state) => state.getFavoritesCount());
   const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 lg:hidden"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      
      <div
        className={`
          w-64 text-white flex flex-col min-h-screen p-4 border border-gray-500 bg-black
          fixed lg:static top-0 left-0 z-40 transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
           <button><FaPlayCircle className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl ml-1" /></button>
                <div className="mt-16 pt-14 lg:pt-0">
          <ul className="space-y-4">
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
            onClick={() => handleNavigation("/movies")}
            >
              <FaVideo /> Movies
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
            onClick={() => handleNavigation("/watchlist")}
            >
              <FaPlus /> Watchlist
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-400"
            onClick={() => handleNavigation("favorites")}
            >
              <FaHeart /> Favorites
              {favoritesCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center animate-pulse">
                  {favoritesCount}
                </span>
                )}
            </li>
          </ul>
        </div>

        <div className="mt-32">
          <h3 className="text-gray-400 mb-3">Recent Searches</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="cursor-pointer hover:text-white">Zombies Holocaust</li>
            <li className="cursor-pointer hover:text-white">Resident Evil</li>
            <li className="cursor-pointer hover:text-white">Blade and Fans</li>
            <li className="cursor-pointer hover:text-white">Star Wars</li>
          </ul>
        </div>
      </div>
    </>
  );
}