import React from "react";

/**
 * Footer component for GroundMate
 *
 * Props:
 * - logoSrc: optional image URL for logo (if omitted, shows SVG text-logo)
 * - email: contact email (string)
 * - phone: contact phone (string)
 * - links: array of { label, href } for direct links
 */
export default function Footer({
  logoSrc = null,
  email = "project9ro@gmail.com",
  phone = "+91-74072-64892",
  links = [
    { label: "Home", href: "/" },
    { label: "Find Match", href: "/dashboard/joingame" },
    { label: "Create Match", href: "/dashboard/creategame" },
    { label: "About", href: "/about" },
  ],
}) {
  return (
    <footer className="bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#1a1a1a] text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand / Logo + short description */}
          <div className="flex-1 min-w-[320px]">
            <div className="flex items-center gap-3 ">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="GroundMate logo"
                  className="h-12 w-12 object-contain rounded-sm"
                />
              ) : (
                // Simple SVG logo fallback
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  aria-hidden="true"
                >
                  <rect width="48" height="48" rx="8" fill="#2E8B57" />
                  <path
                    d="M14 28L22 18L34 28"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}

              <div>
                <div className="text-white text-2xl font-semibold">GroundMate</div>
                <div className="text-m text-gray-300">Find teammates. Own the field.</div>
              </div>
            </div>

            <p className="mt-4 text-m text-gray-400 max-w-xs">
              GroundMate connects local players and teams for outdoor games. Create matches,
              join teammates, and share game moments — all in one place.
            </p>

            {/* Contact block (visible on mobile) */}
            <div className="mt-5 md:hidden">
              <a
                href={`mailto:${email}`}
                className="block text-sm text-gray-300 underline decoration-dashed"
              >
                {email}
              </a>
              <a href={`tel:${phone}`} className="block text-sm text-gray-300 mt-1">
                {phone}
              </a>
            </div>
          </div>

          {/* Links */}
          <nav className="flex-1 min-w-[160px]">
            <h4 className="text-xl font-semibold text-white">Quick links</h4>
            <ul className="mt-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-gray-300 hover:text-white text-m transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Socials */}
          <div className="flex-1 min-w-[200px]">
            <h4 className="text-xl font-semibold text-white">Contact</h4>

            <div className="mt-4 flex flex-col gap-2">
              <a
                href={`mailto:${email}`}
                className="text-gray-300 hover:text-white text-xl transition-colors"
                aria-label={`Email ${email}`}
              >
                ✉️ {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="text-gray-300 hover:text-white text-xl transition-colors"
                aria-label={`Call ${phone}`}
              >
                📞 {phone}
              </a>
            </div>

            <h4 className="text-xl font-semibold text-white mt-6">Follow</h4>
            <div className="mt-3 flex items-center gap-3">
              {/* Social icons (SVG) */}
              <a
                href="#"
                aria-label="GroundMate on Twitter"
                className="p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <svg className="w-8 h-8 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 19c7.732 0 11.957-6.411 11.957-11.957v-.545A8.544 8.544 0 0022 4.58a8.278 8.278 0 01-2.357.646 4.115 4.115 0 001.804-2.27 8.224 8.224 0 01-2.606.996A4.11 4.11 0 0015.447 3c-2.27 0-4.112 1.842-4.112 4.112 0 .322.036.635.105.936A11.67 11.67 0 013 4.9a4.112 4.112 0 001.273 5.486 4.073 4.073 0 01-1.862-.513v.052c0 2.028 1.444 3.72 3.36 4.106a4.129 4.129 0 01-1.854.07c.523 1.635 2.04 2.826 3.838 2.857A8.242 8.242 0 012 17.54a11.62 11.62 0 006 1.756" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="GroundMate on Instagram"
                className="p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <svg className="w-8 h-8 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6a4 4 0 100 8 4 4 0 000-8zM18.5 5.5a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="GroundMate on Facebook"
                className="p-2 rounded-md hover:bg-white/5 transition-colors"
              >
                <svg className="w-8 h-8 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12.073C22 6.477 17.523 2 11.927 2S2 6.477 2 12.073C2 17.09 5.656 21.127 10.438 22v-7.01H7.897v-2.917h2.541V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.628.772-1.628 1.562v1.875h2.773l-.443 2.917h-2.33V22C18.344 21.127 22 17.09 22 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-10 border-t border-white/5 pt-6 text-sm text-gray-400 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>© {new Date().getFullYear()} GroundMate — All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-white">
              Terms
            </a>
            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
            <a href="/help" className="hover:text-white">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
