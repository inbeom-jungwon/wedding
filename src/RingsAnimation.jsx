export default function RingsAnimation() {
  return (
    <svg
      viewBox="0 0 200 120"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto w-full max-w-[280px]"
    >
      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawRing {
          0%   { stroke-dashoffset: 251; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.9; }
        }
        .ring-left {
          stroke-dasharray: 251;
          stroke-dashoffset: 251;
          animation: drawRing 1.8s cubic-bezier(.4,0,.2,1) 0.2s forwards;
        }
        .ring-right {
          stroke-dasharray: 251;
          stroke-dashoffset: 251;
          animation: drawRing 1.8s cubic-bezier(.4,0,.2,1) 0.6s forwards;
        }
        .diamond {
          animation: shimmer 2.4s ease-in-out 2.2s infinite;
        }
      `}</style>

      {/* 왼쪽 반지 */}
      <circle
        className="ring-left"
        cx="78" cy="62" r="40"
        fill="none"
        stroke="#8b7355"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* 오른쪽 반지 */}
      <circle
        className="ring-right"
        cx="122" cy="62" r="40"
        fill="none"
        stroke="#2c2825"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 다이아몬드 */}
      <g className="diamond" transform="translate(100,24)">
        <polygon points="0,-9 7,0 0,9 -7,0" fill="#8b7355" />
        <polygon points="0,-9 7,0 0,-2" fill="#c9a96e" />
        <polygon points="-7,0 0,-2 0,9" fill="#6b5640" />
      </g>

    </svg>
  )
}
