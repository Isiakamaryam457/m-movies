import { FaPlayCircle } from "react-icons/fa";
export default function Header() {
    return (
         <header className="h-20 border-b border-gray-700 flex items-center justify-center px-4">
          
             <button><FaPlayCircle className="text-3xl sm:text-2xl md:text-2xl lg:text-3xl mr-1 text-gray-400" /></button>
       <h3 className="font-jacques text-gray-400 text-xl sm:text-2xl lg:text-3xl whitespace-nowrap">
                        M-Movies Hub
                        </h3>
                        
    </header>
  );

    
    
}