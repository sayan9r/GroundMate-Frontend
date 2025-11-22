"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar";
//  "@/components/ui/resizable-navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export function NavbarDemo({user,setUser}) {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const navigate = useNavigate();  // navigate to route the auth login and sign up
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);




  return (
    <div className="relative w-full ">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-4">
            {user ? (
               <NavbarButton variant="primary" onClick={() => navigate("/dashboard")}>Profile</NavbarButton>

            ) : (
              <>
              <NavbarButton variant="secondary" onClick={() => navigate("/login")}>Login</NavbarButton>
              <NavbarButton variant="primary" onClick={() => navigate("/signup")}>Sign Up</NavbarButton>
              </>
            )}   
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {user ?  (
                <NavbarButton variant="primary" onClick={() => navigate("/dashboard")}>Profile</NavbarButton>
              ) : (
                <>
                <NavbarButton
                onClick={() => navigate("/login")}
                variant="primary"
                className="w-full">
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => navigate("/signup")}
                variant="primary"
                className="w-full">
                Sign up
              </NavbarButton>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* <DummyContent />  */}
      {/* Navbar */}
    </div>
  );
}

// const DummyContent = () => {
//   return (
//     <div className="container mx-auto p-8 pt-34">
//       <h1 className="mb-4 text-center text-3xl text-white font-bold">
//         Check the navbar at the top of the container
//       </h1>
//       <p className="mb-10 text-center text-sm text-zinc-500">
//         For demo purpose we have kept the position as{" "}
//         <span className="font-medium">Sticky</span>. Keep in mind that this
//         component is <span className="font-medium">fixed</span> and will not
//         move when scrolling.
//       </p>
      
//     </div>
//   );
// };
