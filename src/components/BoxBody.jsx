"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { NavbarDemo } from "./Header/Navbar";
import CustomButton from "./CustomBUtton";
import About from "./About/About";
import MiddleArea from "./MiddleArea";

export function BoxBody() {
  return (
    <div
      className="relative flex min-h-[100vh] w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      
      
      <div className="mt-30 w-full">
        <h2
          className="relative z-10 mx-auto max-w-4xl text-center text-xl font-bold text-neutral-800 md:text-3xl lg:text-6xl dark:text-neutral-100">
          {/* Interactive Background Boxes Ripple Effect */}
          Let's Go Back To The Field Again ...
        
        </h2>
        <p
          className="relative z-10 mx-auto mt-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
          {/* Hover over the boxes above and click.To be used on backgrounds of hero
          sections OR Call to Action sections. I beg you don&apos;t use it
          everywhere. */}
          GroundMate , A community for players to play more efficiently with your near area 
        </p>
         
        
      
      </div>
   
    </div>
    
  );
}
