import React, { useCallback, useEffect, useState } from 'react';
import { BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import useCurrentUser from "@/hooks/useCurrentUser";



const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const { data: currentUser } = useCurrentUser();
  const redirectToMaps = () => {
    window.location.href = '/map'; // Redirect to the maps page
  };

  return (

    
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <img src="/images/logo.png" className="h-15 lg:h-20" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Educational" />
          <NavbarItem label="Training" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Category" />
          <NavbarItem label="Map" onClick={redirectToMaps} />
        </div>
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon className={`w-6 text-white fill-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <MagnifyingGlassIcon className="w-8" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-8" />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-md overflow-hidden">
    <img src={currentUser?.image || "/images/profiles/5992.png"} alt="" />
  </div>
  <ChevronDownIcon className={`w-6 text-white fill-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
  <AccountMenu visible={showAccountMenu} />
</div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;
