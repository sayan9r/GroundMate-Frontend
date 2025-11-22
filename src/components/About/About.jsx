import React from 'react'

export default function About() {
  return (
    <div className="bg-white">
  {/* White Section - About Intro */}
  <div className="py-0 h-auto">
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:w-5/12 lg:w-5/12 flex justify-center">
          <img
            src="full_logo.png"
            alt="Logo"
            className="w-[360px] md:w-[400px] lg:w-[440px]"
          />
        </div>

        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
            From Strangers to Teammates - GroundMate Brings You Together.
          </h2>
          <p className="mt-6 text-gray-600">
            GroundMate is your ultimate platform for connecting sports enthusiasts,
            players, and organizers — all in one place. We believe that finding the 
            right teammates, nearby grounds, or local tournaments should be simple, social, and fun.
          </p>
          <p className="mt-4 text-gray-600">
            GroundMate isn’t just an app — it’s a community for players, by players.
            Join us in reshaping how the world plays, connects, and competes — one ground at a time.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Black Section - About Details */}
  <div className="bg-black text-white flex flex-col items-center px-6 md:px-16 py-16">
    {/* Header */}
    <h1 className="text-4xl font-bold mb-6 text-center">Why GroundMate?</h1>
    <p className="text-gray-300 text-center max-w-3xl leading-relaxed mb-12">
      We noticed that organizing outdoor games often takes more effort than
      playing itself — from finding available grounds to managing teams and
      schedules. GroundMate solves this by bringing technology to the field,
      offering real-time ground availability, easy bookings, and a connected
      community for players and owners alike.
    </p>

    {/* Mission & Vision Section */}
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
      <div className="p-6 border border-gray-700 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition duration-300">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-400 leading-relaxed">
          To simplify how people book and play outdoor sports. We aim to connect
          players with quality turfs, making game organization smoother and more
          accessible for everyone across India.
        </p>
      </div>

      <div className="p-6 border border-gray-700 rounded-xl bg-neutral-900 hover:bg-neutral-800 transition duration-300">
        <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
        <p className="text-gray-400 leading-relaxed">
          To become India’s leading sports booking and management platform —
          empowering communities to stay active, connected, and passionate about
          playing together.
        </p>
      </div>
    </div>

    {/* Footer */}
    <footer className="mt-16 text-gray-500 text-sm border-t border-gray-800 pt-6 w-full text-center">
      GroundMate. Built for players, by players.
    </footer>
  </div>
</div>

    
  );
}