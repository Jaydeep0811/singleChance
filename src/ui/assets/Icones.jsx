// const  = require();
import { createSvgIcon } from "@mui/material";

export const HomeIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={17}
    fill="none"
    // {...props}
  >
    <path
      fill="#fff"
      d="M8 16v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1V9h1.7c.46 0 .68-.57.33-.87L10.67.6c-.38-.34-.96-.34-1.34 0L.97 8.13c-.34.3-.13.87.33.87H3v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"
    />
  </svg>
);

export const CheckIcon = createSvgIcon(
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width={16}
  //   height={16}
  //   fill="none"
  //   // {...props}
  // >
  //   <path
  //     fill="#042655"
  //     d="M.546 7.84c2.23 2.413 4.391 4.585 6.47 7.332 2.259-4.494 4.572-9.003 8.387-13.887l-1.028-.47c-3.222 3.416-5.725 6.65-7.9 10.494-1.513-1.362-3.957-3.29-5.45-4.28z"
  //   />
  // </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    // {...props}
  >
    <rect width={24} height={24} fill="#fff" rx={6} />
  </svg>
);

export const CheckedInIcon = createSvgIcon(
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <rect width={32} height={32} rx={8} fill="#fff" />
    <g clipPath="url(#clip0_25_758)">
      <path
        d="M8.546 15.84c2.23 2.413 4.392 4.585 6.47 7.332 2.259-4.494 4.571-9.003 8.387-13.887l-1.028-.47c-3.222 3.416-5.725 6.65-7.9 10.494-1.512-1.362-3.957-3.29-5.45-4.28l-.48.812z"
        fill="#042655"
      />
    </g>
    <defs>
      <clipPath id="clip0_25_758">
        <path fill="#fff" transform="translate(8 8)" d="M0 0H16V16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const SoundOnIcon = createSvgIcon(
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <rect width={32} height={32} rx={8} fill="#457DCA" />
    <g clipPath="url(#clip0_25_739)">
      <path
        d="M15.255 6.818c-.247 0-.52.111-.77.36l-4.399 4.976H6.77a.77.77 0 00-.769.77v6.153c0 .424.345.77.77.77h3.317l4.374 4.951c.77.77 1.539.376 1.539-.673V7.754c0-.609-.333-.94-.745-.938v.002zm5.576 1.538a.77.77 0 00-.167 1.466A6.892 6.892 0 0124.46 16a6.892 6.892 0 01-3.798 6.178.769.769 0 10.673 1.37C24.1 22.155 26 19.299 26 16s-1.9-6.154-4.664-7.548a.77.77 0 00-.432-.096.771.771 0 00-.073 0zm-1.826 2.98a.769.769 0 00-.313 1.442c1.187.738 1.923 1.907 1.923 3.222 0 1.325-.747 2.509-1.946 3.245a.769.769 0 10.816 1.298c1.593-.977 2.669-2.638 2.669-4.543 0-1.893-1.067-3.564-2.645-4.543a.77.77 0 00-.432-.12.726.726 0 00-.072 0z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="clip0_25_739">
        <path fill="#fff" transform="translate(6 6)" d="M0 0H20V20H0z" />
      </clipPath>
    </defs>
  </svg>
);

export const InfoIcon = createSvgIcon(
  <svg
    width={52}
    height={52}
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x={1} y={1} width={50} height={50} rx={9} fill="#457DCA" />
    <rect
      x={1}
      y={1}
      width={50}
      height={50}
      rx={9}
      stroke="white"
      strokeWidth={2}
    />
    <path
      d="M27.8599 23.176L23.2799 23.75L23.1159 24.51L24.0159 24.676C24.6039 24.816 24.7199 25.028 24.5919 25.614L23.1159 32.55C22.7279 34.344 23.3259 35.188 24.7319 35.188C25.8219 35.188 27.0879 34.684 27.6619 33.992L27.8379 33.16C27.4379 33.512 26.8539 33.652 26.4659 33.652C25.9159 33.652 25.7159 33.266 25.8579 32.586L27.8599 23.176ZM27.9999 19C27.9999 19.5304 27.7892 20.0391 27.4141 20.4142C27.039 20.7893 26.5303 21 25.9999 21C25.4695 21 24.9608 20.7893 24.5857 20.4142C24.2106 20.0391 23.9999 19.5304 23.9999 19C23.9999 18.4696 24.2106 17.9609 24.5857 17.5858C24.9608 17.2107 25.4695 17 25.9999 17C26.5303 17 27.039 17.2107 27.4141 17.5858C27.7892 17.9609 27.9999 18.4696 27.9999 19Z"
      fill="white"
    />
  </svg>
);

export const CancleButton = createSvgIcon(
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx={24}
      cy={24}
      r={23}
      fill="url(#paint0_radial_42_2832)"
      stroke="url(#paint1_linear_42_2832)"
      strokeWidth={2}
    />
    <path
      d="M28.648 35.51l-6.888-8.212L14.086 36h-.63l6.494-10.887L12 15.62 18.218 14l4.605 6.291 3.424-5.764h6.69l-7.792 8.929L34 35.51h-5.352z"
      fill="#fff"
    />
    <defs>
      <radialGradient
        id="paint0_radial_42_2832"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(4.99999 26 -24.22816 4.65925 19 22)"
      >
        <stop stopColor="#FF3232" />
        <stop offset={1} stopColor="#530909" />
      </radialGradient>
      <linearGradient
        id="paint1_linear_42_2832"
        x1={39}
        y1={45}
        x2={16}
        y2={13}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F98C07" />
        <stop offset={1} stopColor="#FFD54A" />
      </linearGradient>
    </defs>
  </svg>
);

export const Visbility = createSvgIcon(
  <svg
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6a4 4 0 100 8 4 4 0 000-8zm0 10.667a6.666 6.666 0 110-13.333 6.666 6.666 0 010 13.333zM15 0C8.333 0 2.64 4.147.333 10c2.307 5.853 8 10 14.667 10s12.36-4.147 14.667-10C27.36 4.147 21.667 0 15 0z"
      fill="#fff"
    />
  </svg>
);

export const CloseIcon = createSvgIcon(
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={32} height={32} rx={8} fill="#457DCA" />
    <path
      d="M21.25 10.758a.83.83 0 00-1.175 0L16 14.825l-4.075-4.075a.832.832 0 00-1.175 1.175L14.825 16l-4.075 4.075a.832.832 0 001.175 1.175L16 17.175l4.075 4.075a.83.83 0 101.175-1.175L17.175 16l4.075-4.075a.835.835 0 000-1.167z"
      fill="#fff"
    />
  </svg>
);

export const MinimizeIcon = createSvgIcon(
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={32} height={32} rx={8} fill="#457DCA" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.083 16a1.25 1.25 0 011.25-1.25h13.334a1.25 1.25 0 010 2.5H9.333A1.25 1.25 0 018.083 16z"
      fill="#fff"
    />
  </svg>
);
