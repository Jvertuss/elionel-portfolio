const PATHS = {
  laptop: (<><rect x="14" y="12" width="36" height="26" rx="3" /><path d="M8 50h48l-7-12H15L8 50Z" /><path d="M25 44h14" /></>),
  person: (<><circle cx="32" cy="18" r="10" /><path d="M12 54c2-14 10-21 20-21s18 7 20 21" /></>),
  game: (<><path d="M17 22h30c6 0 10 5 11 12l2 12c1 6-6 9-10 5l-8-8H22l-8 8c-4 4-11 1-10-5l2-12c1-7 5-12 11-12Z" /><path d="M18 31v10M13 36h10M43 31h.01M50 39h.01" /></>),
  code: <path d="m23 18-11 14 11 14M41 18l11 14-11 14M37 12 27 52" />,
  doc: (<><path d="M16 7h23l10 11v39H16V7Z" /><path d="M39 7v12h10M24 31h17M24 41h17M24 50h12" /></>),
  linkedin: (<><rect x="8" y="8" width="48" height="48" rx="6" /><path d="M20 28v20M20 20h.01M31 48V28M31 37c0-6 4-9 9-9 6 0 8 4 8 10v10" /></>),
  mail: (<><rect x="7" y="14" width="50" height="36" rx="4" /><path d="m10 18 22 18 22-18" /></>),
  people: (<><circle cx="24" cy="22" r="8" /><circle cx="43" cy="25" r="6" /><path d="M8 50c2-10 9-15 16-15s14 5 16 15M36 39c9-2 16 3 19 11" /></>),
  briefcase: (<><rect x="8" y="19" width="48" height="33" rx="5" /><path d="M23 19v-6h18v6M8 31c12 7 36 7 48 0M28 33h8" /></>),
  store: (<><path d="M10 24h44l-5-12H15l-5 12Z" /><path d="M13 24v28h38V24M22 52V36h14v16" /></>),
  rocket: (<><path d="M38 9c8 2 15 9 17 17L36 45 19 28 38 9Z" /><path d="M19 28 9 31l8 7M36 45l-3 10-7-8M25 39l-9 9" /><circle cx="41" cy="23" r="5" /></>),
  gear: (<><circle cx="32" cy="32" r="10" /><path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5" /></>),
  chip: (<><rect x="18" y="18" width="28" height="28" rx="3" /><path d="M25 7v11M32 7v11M39 7v11M25 46v11M32 46v11M39 46v11M7 25h11M7 32h11M7 39h11M46 25h11M46 32h11M46 39h11" /></>),
  chart: <path d="M11 52h43M16 46V31M28 46V22M40 46V35M52 46V15" />,
  image: (<><rect x="8" y="10" width="48" height="44" rx="4" /><circle cx="22" cy="24" r="5" /><path d="m12 49 14-14 9 9 7-8 10 13" /></>),
  food: <path d="M17 9v18M11 9v11c0 5 12 5 12 0V9M17 27v28M40 9c8 8 8 22 0 29v17M40 9v29" />,
  plane: <path d="m8 36 20-8 13-18 6 2-7 20 15 9-2 5-18-5-8 14-5-2 2-17-15 5-1-5Z" />,
  ball: (<><path d="M10 46C10 26 26 10 46 10c8 0 8 0 8 8 0 20-16 36-36 36-8 0-8 0-8-8Z" /><path d="m24 40 16-16M28 30l6 6M33 25l6 6" /></>),
  radar: (<><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="11" /><path d="M32 32 48 16M32 10v6" /></>),
  wave: <path d="M4 32c5-18 9-18 14 0s9 18 14 0 9-18 14 0 9 18 14 0" />,
  bolt: <path d="M36 6 14 36h16l-4 22 24-32H34l2-20Z" />,
  turbine: (<><circle cx="32" cy="26" r="3" /><path d="M32 29v29M25 58h14M32 23V6M35 28l16 9M29 28 13 37" /></>),
  trophy: (<><path d="M20 10h24v14c0 9-6 15-12 15S20 33 20 24V10Z" /><path d="M20 14h-8c0 9 4 13 8 14M44 14h8c0 9-4 13-8 14M32 39v10M22 54h20M26 49h12" /></>),
  boat: (<><path d="M6 40h52l-8 12H14L6 40Z" /><path d="M32 8v30M32 10l16 24H32" /></>),
  home: <path d="M8 30 32 10l24 20M14 26v26h12V38h12v14h12V26" />,
  back: <path d="M52 32H14M28 16 12 32l16 16" />,
  forward: <path d="M12 32h38M36 16l16 16-16 16" />,
  external: <path d="M26 14H12v38h38V38M34 12h18v18M52 12 28 36" />,
  download: <path d="M32 10v32M18 30l14 14 14-14M12 54h40" />,
  copy: <path d="M22 22h30v34H22V22ZM14 42V10h30" />,
  check: <path d="m12 34 14 14 26-30" />,
  play: <path d="M22 14l28 18-28 18V14Z" />,
  pause: <path d="M22 14v36M42 14v36" />,
  prev: <path d="M46 14 20 32l26 18V14ZM16 14v36" />,
  next: <path d="M18 14l26 18-26 18V14ZM48 14v36" />,
  volume: <path d="M10 26h10l14-12v36L20 38H10V26ZM42 24c4 5 4 11 0 16M48 18c8 8 8 20 0 28" />,
  mute: <path d="M10 26h10l14-12v36L20 38H10V26ZM44 26l14 12M58 26 44 38" />,
  calendar: <path d="M10 16h44v40H10V16ZM10 28h44M22 8v14M42 8v14" />,
  list: <path d="M10 16h44M10 32h44M10 48h44" />,
  music: <path d="M24 46V14l26-6v32M24 46a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM50 40a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />,
  close: <path d="M14 14l36 36M50 14 14 50" />,
}

export default function Icon({ type, size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[type] || PATHS.gear}
    </svg>
  )
}
