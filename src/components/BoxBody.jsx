"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { NavbarDemo } from "./Header/Navbar";
import CustomButton from "./CustomBUtton";
import About from "./About/About";
import MiddleArea from "./MiddleArea";
import HorizontalLine from "./HorizontalLine";
import { NavbarButton } from "./ui/resizable-navbar";
import { useNavigate } from "react-router-dom";

export function BoxBody() {
  const navigate = useNavigate();
  return (
    <div className="relative flex max-h-full w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
     

      <div className="mt-30 w-full">
        <h2 className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-neutral-800 md:text-3xl lg:text-6xl dark:text-neutral-100">
          Let&apos;s Go Back To The Field Again ...
        </h2>

        <p className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          GroundMate, a community for players to play more efficiently with your
          near area
        </p>

        {/* Buttons */}
        <div className="relative z-10 mt-8 flex w-full justify-center gap-6">
          <NavbarButton className="hover:bg-gradient-to-r hover:from-black hover:via-blue-300 hover:to-blue-500" variant="primary" onClick={() => navigate("/login")}>Get Started</NavbarButton>

          <NavbarButton className="hover:bg-gradient-to-r hover:from-blue-500 hover:via-blue-300 hover:to-black" variant="primary" onClick={() => navigate("/about")}>know more</NavbarButton>
        </div>
        <br /><br />
        
      </div>

     
      

    {/* Team-mate Section */}
 <section className="relative w-full bg-black py-20 px-6 md:px-16">
   {/* Soft Divider */}
  <div className="mx-auto mb-10 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

  <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-2">
    
    
    {/* Left Content */}
    <div className="text-left">
      <h2 className="text-2xl text-blue-400 font-bold md:text-4xl">
        Easiest Way to Find Team-mate
      </h2>

      <p className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg">
        GroundMate helps you connect with nearby players effortlessly.
        
        Find teammates based on location, skill level, and availability.
        <br />
        Build your squad, organize matches, and play more.
        No hassle. No <br />confusion. Just pure game time.
      </p>
    </div>

    {/* Right Image */}
  <div className="flex justify-center md:justify-end">
   <img
    src="/image1.png"
    alt="Find Team Mate"
    className="
      h-auto w-full max-w-md rounded-2xl object-cover
      drop-shadow-[0_0_50px_rgba(59,130,246,0.6)]
      drop-shadow-[0_0_100px_rgba(59,130,246,0.45)]
      transition-all duration-300
      hover:drop-shadow-[0_0_70px_rgba(59,130,246,1)]
      hover:drop-shadow-[0_0_140px_rgba(59,130,246,0.7)]
    "
   />
  </div>

  
 </div>
</section>


  </div>
  );
}
