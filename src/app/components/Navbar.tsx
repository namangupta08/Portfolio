'use client'
import React from 'react'
import {
    IconHome,
  } from "@tabler/icons-react";
import { LucideLaptop } from "lucide-react";
import { FloatingDock } from './ui/floating-dock';
function Navbar() {
    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="text-black dark:text-black" />
          ),
          href: "/",
        },
        {
          title: "Projects",
          icon: (
            <LucideLaptop className="text-black dark:text-black" />
          ),
          href: "/projects",
        },
        
      ];
  return (
    <div className='flex justify-center items-center pt-8 mt-8 relative z-50'>
      <div className=''>
         <FloatingDock
         mobileClassName="sm:translate-y-0 "
        items={links}
      />
      </div>
    </div>
  )
}

export default Navbar
