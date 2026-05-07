import React, { useEffect, useState } from 'react';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden flex items-center justify-center py-16 md:py-24"
      style={{
        background: 'linear-gradient(135deg, #d0dcea 0%, #b8cce0 20%, #c5d5e8 40%, #dce6f0 60%, #c8d8e8 80%, #b5c9de 100%)',
      }}
    >
      {/* Molecular structure SVG background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mol-grid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Hexagonal ring */}
            <polygon points="60,20 80,30 80,50 60,60 40,50 40,30" fill="none" stroke="#4a6a8a" strokeWidth="0.8" />
            <polygon points="80,50 100,60 100,80 80,90 60,80 60,60" fill="none" stroke="#4a6a8a" strokeWidth="0.6" />
            {/* Bond lines */}
            <line x1="80" y1="30" x2="100" y2="20" stroke="#4a6a8a" strokeWidth="0.5" />
            <line x1="100" y1="60" x2="120" y2="50" stroke="#4a6a8a" strokeWidth="0.5" />
            <line x1="40" y1="30" x2="20" y2="20" stroke="#4a6a8a" strokeWidth="0.5" />
            {/* Small circles at vertices */}
            <circle cx="60" cy="20" r="2" fill="#5a7a9a" opacity="0.5" />
            <circle cx="80" cy="30" r="1.5" fill="#5a7a9a" opacity="0.4" />
            <circle cx="100" cy="60" r="2" fill="#5a7a9a" opacity="0.5" />
            <circle cx="80" cy="90" r="1.5" fill="#5a7a9a" opacity="0.4" />
            {/* Second cluster */}
            <polygon points="150,110 170,120 170,140 150,150 130,140 130,120" fill="none" stroke="#4a6a8a" strokeWidth="0.7" />
            <line x1="170" y1="120" x2="190" y2="110" stroke="#4a6a8a" strokeWidth="0.5" />
            <line x1="130" y1="120" x2="110" y2="110" stroke="#4a6a8a" strokeWidth="0.5" />
            <circle cx="150" cy="110" r="2" fill="#5a7a9a" opacity="0.5" />
            <circle cx="190" cy="110" r="1.5" fill="#5a7a9a" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mol-grid)" />
      </svg>

      {/* Scattered molecular formulas */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* NH2 labels scattered */}
        <text x="8%" y="12%" fill="#5a7a9a" opacity="0.25" fontSize="13" fontFamily="monospace">NH₂</text>
        <text x="22%" y="8%" fill="#5a7a9a" opacity="0.2" fontSize="11" fontFamily="monospace">NH₂</text>
        <text x="42%" y="6%" fill="#5a7a9a" opacity="0.22" fontSize="12" fontFamily="monospace">NH₂</text>
        <text x="75%" y="10%" fill="#5a7a9a" opacity="0.2" fontSize="11" fontFamily="monospace">NH₂</text>
        <text x="90%" y="15%" fill="#5a7a9a" opacity="0.18" fontSize="13" fontFamily="monospace">NH₂</text>
        <text x="5%" y="55%" fill="#5a7a9a" opacity="0.2" fontSize="11" fontFamily="monospace">NH₂</text>
        <text x="15%" y="80%" fill="#5a7a9a" opacity="0.18" fontSize="12" fontFamily="monospace">NH₂</text>
        <text x="85%" y="75%" fill="#5a7a9a" opacity="0.15" fontSize="11" fontFamily="monospace">NH₂</text>

        {/* CO2 labels */}
        <text x="55%" y="52%" fill="#5a7a9a" opacity="0.18" fontSize="11" fontFamily="monospace">CO₂</text>
        <text x="35%" y="90%" fill="#5a7a9a" opacity="0.15" fontSize="10" fontFamily="monospace">CO₂</text>

        {/* Extra hexagonal structures scattered */}
        {/* Top-left molecule */}
        <g opacity="0.12" transform="translate(80, 180)">
          <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="none" stroke="#4a6a8a" strokeWidth="1" />
          <line x1="17" y1="-10" x2="34" y2="-20" stroke="#4a6a8a" strokeWidth="0.8" />
          <line x1="-17" y1="-10" x2="-34" y2="-20" stroke="#4a6a8a" strokeWidth="0.8" />
          <line x1="0" y1="20" x2="0" y2="38" stroke="#4a6a8a" strokeWidth="0.8" />
          <circle cx="0" cy="-20" r="2.5" fill="#6a8aaa" />
          <circle cx="34" cy="-20" r="2" fill="#6a8aaa" />
          <circle cx="-34" cy="-20" r="2" fill="#6a8aaa" />
        </g>

        {/* Bottom-left molecule */}
        <g opacity="0.10" transform="translate(160, 520)">
          <polygon points="0,-18 16,-9 16,9 0,18 -16,9 -16,-9" fill="none" stroke="#4a6a8a" strokeWidth="0.9" />
          <polygon points="16,9 32,18 32,36 16,45 0,36 0,18" fill="none" stroke="#4a6a8a" strokeWidth="0.9" />
          <circle cx="0" cy="-18" r="2" fill="#6a8aaa" />
          <circle cx="32" cy="18" r="2" fill="#6a8aaa" />
        </g>

        {/* Right-side large molecule */}
        <g opacity="0.08" transform="translate(1050, 400)">
          <polygon points="0,-25 22,-12 22,12 0,25 -22,12 -22,-12" fill="none" stroke="#4a6a8a" strokeWidth="1" />
          <line x1="22" y1="-12" x2="44" y2="-25" stroke="#4a6a8a" strokeWidth="0.8" />
          <line x1="-22" y1="-12" x2="-44" y2="-25" stroke="#4a6a8a" strokeWidth="0.8" />
          <circle cx="44" cy="-25" r="2.5" fill="#6a8aaa" />
          <circle cx="-44" cy="-25" r="2.5" fill="#6a8aaa" />
        </g>

        {/* Bottom-right pyridine-like ring */}
        <g opacity="0.10" transform="translate(1100, 200)">
          <polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="none" stroke="#4a6a8a" strokeWidth="0.9" />
          <text x="-5" y="-25" fill="#5a7a9a" fontSize="9" fontFamily="monospace">N</text>
          <line x1="0" y1="-20" x2="0" y2="-35" stroke="#4a6a8a" strokeWidth="0.7" />
        </g>
      </svg>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Content */}
        <div className={`
          flex flex-col items-center text-center max-w-3xl
          transition-all duration-1000 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 leading-[1.1] tracking-tight"
            style={{
              background: 'linear-gradient(180deg, #5b8cc2 0%, #2a4e7a 40%, #1a3a5c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(30,60,100,0.3))',
            }}
          >
            THE AMINE PROTOCOL
          </h1>

          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold italic mb-4 leading-tight"
            style={{
              background: 'linear-gradient(180deg, #4a7ab5 0%, #2a4e7a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FOUNDATIONS OF ADVANCED WELLNESS.
          </h2>

          <p
            className="text-xs md:text-sm tracking-[0.15em] mb-10 font-medium"
            style={{ color: '#4a6a8a' }}
          >
            BIOMOLECULAR OPTIMIZATION &nbsp;|&nbsp; CELLULAR PRECISION &nbsp;|&nbsp; PROTOCOL DRIVEN RESULTS
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              onClick={onShopAll}
              className="group relative w-full sm:w-auto px-10 py-4 font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden text-white"
              style={{
                background: 'linear-gradient(135deg, #2a4e7a 0%, #3d72b5 50%, #2a4e7a 100%)',
                backgroundSize: '200% auto',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = 'right center')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = 'left center')}
            >
              <span className="relative z-10">Shop Peptides</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button
              onClick={onShopAll}
              className="w-full sm:w-auto px-10 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center"
              style={{
                border: '1.5px solid #4a6a8a',
                color: '#2a4e7a',
                background: 'rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(42,78,122,0.1)';
                e.currentTarget.style.borderColor = '#2a4e7a';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.borderColor = '#4a6a8a';
              }}
            >
              Learn More
            </button>
          </div>
        </div>

      </div>

      {/* Bottom fade to dark (transition to rest of site) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, #0B1120, transparent)',
        }}
      />
    </div>
  );
};

export default Hero;
