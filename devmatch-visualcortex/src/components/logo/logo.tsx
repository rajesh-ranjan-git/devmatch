const Logo = () => {
  return (
    <div className="w-12">
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="#0F172A"
          stroke="#3B82F6"
          strokeWidth="2"
        />

        <path
          d="M 35 35 L 25 60 L 35 85"
          stroke="#3B82F6"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M 85 35 L 95 60 L 85 85"
          stroke="#EC4899"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <g transform="translate(60, 60)">
          <path
            d="M -12 -8 C -12 -12 -8 -15 -4 -15 C -1 -15 2 -12 0 -8 L -12 8 Z"
            fill="#3B82F6"
          />

          <path
            d="M 12 -8 C 12 -12 8 -15 4 -15 C 1 -15 -2 -12 0 -8 L 12 8 Z"
            fill="#EC4899"
          />

          <circle cx="-18" cy="-12" r="2.5" fill="#3B82F6" />
          <circle cx="-21" cy="-9" r="1.5" fill="#3B82F6" opacity="0.6" />

          <circle cx="18" cy="-12" r="2.5" fill="#EC4899" />
          <circle cx="21" cy="-9" r="1.5" fill="#EC4899" opacity="0.6" />

          <path
            d="M24 22
           c0 -1.6 1.3 -2.8 3 -2.8
           c1.3 0 2.4 1 2.4 2.3
           c0 2 -2.6 4 -5.2 6
           c-2.6 -2 -5.2 -4 -5.2 -6
           c0 -1.2 1 -2.3 2.4 -2.3
           c1.7 0 3 1.2 3 2.8 z"
            transform="translate(-48,-28) scale(2.0) translate(0,0)"
            fill="#EC4899"
            stroke="none"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
