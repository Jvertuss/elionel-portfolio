import { asset } from './data.js'

const img = (file) => asset(`images/projects/${file}`)

// All project write-ups live here. Order = display order (strongest electrical/embedded work first).
//
// Optional fields per project:
//   cover   { src, pos }          photo used instead of the icon on the project card
//   stats   [{ value, label }]    big-number tiles on the detail page
//   links   [{ label, href }]     buttons (live site, source code, ...)
//   table   { columns, rows, note }
//   figures [{ src, alt, caption }]
export const PROJECTS = [
    {
        id: 'shrike',
        title: 'Project SHRIKE',
        status: 'IN PROGRESS',
        tone: 'green',
        icon: 'chip',
        categories: ['embedded', 'progress'],
        period: 'Fall 2026 – Present',
        role: 'Firmware Co-Lead, IEEE Computer Society at UCF',
        summary:
            'Co-leading firmware for a custom Jetson-based portable workstation: Linux boot-up, board support package (BSP) configuration, and carrier-board bring-up.',
        tags: ['NVIDIA Jetson', 'Embedded Linux', 'BSP', 'PCB bring-up'],
        overview: [
            'Project SHRIKE is a multi-team IEEE Computer Society, IEEE, and HackUCF build: a self-contained portable workstation around an NVIDIA Jetson Orin module on a single custom carrier PCB, designed to mate with a Framework Laptop 13 chassis.',
            'I co-lead the firmware side. That means getting Linux to boot on the custom hardware, configuring the BSP for our carrier board, and working with the PCB team so power sequencing, GPIO, and peripheral communication line up between the schematic and the software.',
        ],
        highlights: [
            'Co-lead firmware development focused on Linux boot-up, BSP configuration, and carrier-board bring-up.',
            'Coordinate firmware and PCB integration for power sequencing, GPIO, peripheral communication, and hardware connectivity.',
            'Develop and debug the embedded Linux environment for device configuration, peripheral testing, and system-level hardware debugging.',
        ],
        architecture: {
            heading: 'Planned architecture (team spec, Rev 1.0)',
            items: [
                'One custom carrier PCB holds the compute module, power subsystem, embedded controller, display interface, networking, and storage.',
                'Firmware is planned in four layers: Orin BSP (pinmux and device tree), a fork of Framework’s open embedded-controller firmware, power-path configuration, and Linux userspace.',
                'A separate always-on ESP32 supervisor is planned to watch system health and force recovery if the main processor hangs.',
                'Bring-up is phased: prove the toolchain on a dev kit first, then reach a serial console on the custom board, then enable USB, storage, display, and PCIe one at a time.',
            ],
        },
        statusNote:
            'Work in progress. The team is in the design and bring-up planning stage, so there are no completed-build results to report yet.',
        stack: ['NVIDIA Jetson Orin', 'Embedded Linux', 'Device tree / BSP', 'UART console', 'Power sequencing', 'GPIO / I2C'],
    },
    {
        id: 'pose-estimation-research',
        title: 'Sensor Fusion & Neural Pose Estimation',
        status: 'RESEARCH',
        tone: 'blue',
        icon: 'radar',
        categories: ['embedded', 'progress'],
        period: 'Jan 2026 – Present',
        role: 'Undergraduate Researcher, University of Central Florida',
        summary:
            'STM32 firmware and Raspberry Pi data acquisition for real-time state estimation, supporting research on neural-process-based video object pose estimation.',
        tags: ['STM32', 'Raspberry Pi', 'Sensor fusion', 'Python'],
        overview: [
            'This is an ongoing undergraduate research project on neural process-based video object pose estimation. The experiments depend on clean, time-aligned data from several sensors at once.',
            'My part is the embedded side: firmware and hardware that collect data from IMU, encoder, LiDAR, and depth-camera sensors, and a Raspberry Pi that handles collection, preprocessing, and logging.',
        ],
        highlights: [
            'Develop STM32 firmware for embedded data acquisition, interfacing IMU, encoder, LiDAR, and depth-camera sensors used in real-time state-estimation experiments.',
            'Integrate the STM32 sensing hardware with a Raspberry Pi processing platform for sensor collection, preprocessing, logging, and multi-sensor data acquisition.',
            'Support evaluation of an Attentive Neural Process against a ConvLSTM baseline: 0.0016 test RMSE versus 0.0071, about 77.5% lower prediction error.',
        ],
        statusNote:
            'Ongoing research. The model comparison above comes from the lab’s evaluation, where I supported the work; my main contribution is the embedded sensing and data-acquisition side.',
        stack: ['STM32', 'C / C++', 'Raspberry Pi', 'Python', 'IMU / encoder / LiDAR / depth camera'],
    },
    {
        id: 'gridiron-gauntlet',
        title: 'Gridiron Gauntlet',
        status: 'PERSONAL PROJECT',
        tone: 'red',
        icon: 'game',
        categories: ['software'],
        period: 'Summer 2026',
        role: 'Creator and lead developer',
        summary:
            'A historical fantasy-football strategy game: build a roster from player-seasons, play randomized NFL weeks, make trades, collect perks, and try to survive a 12-round gauntlet.',
        tags: ['React', 'Vite', 'Game design', 'Progressive web app'],
        stats: [
            { value: '12', label: 'rounds in the gauntlet' },
            { value: '25', label: 'Hall of Fame runs saved' },
            { value: '0', label: 'accounts or servers needed' },
        ],
        links: [
            { label: 'Play the game', href: 'https://jvertuss.github.io/Grid-Gauntlet/' },
            { label: 'Source code on GitHub', href: 'https://github.com/Jvertuss/Grid-Gauntlet' },
        ],
        overview: [
            'Gridiron Gauntlet is a fantasy-football game I designed and built on my own. You assemble a roster, move through randomized NFL weeks, make trades, pick up random perks, and try to build the best team you can. I wanted something that mixes fantasy football with a little luck and strategy instead of being one more stats website.',
            'It is a React and Vite web app that runs entirely in the browser and is deployed as a static site on GitHub Pages.',
        ],
        highlights: [
            'Designed the whole game loop: roster building around historical player-seasons, weekly matchups, trades, random perks, and a 12-round gauntlet.',
            'Built and shipped it solo in React and Vite, including a production build with relative asset paths so it deploys to any static host.',
            'Saves a Hall of Fame of past runs in the browser (capped at 25 runs), so no accounts, database, or server are required.',
            'Also builds as an installable browser app (PWA) without changing the game itself.',
            'Added in-game Privacy Policy, Terms, sports disclaimer, and open-source license pages, plus a restrictive Content Security Policy and a no-referrer policy.',
            'The repository documents its mobile UX, performance, integration, and security notes, and uses Oxlint for linting.',
        ],
        statusNote: 'Playable now. Built as a summer 2026 project.',
        stack: ['React', 'Vite', 'JavaScript', 'HTML / CSS', 'localStorage', 'PWA build', 'GitHub Pages', 'Oxlint'],
    },
    {
        id: 'armv7-energy',
        title: 'ARMv7 Assembly & Energy-Efficient Computing',
        status: 'COURSE PROJECT',
        tone: 'purple',
        icon: 'code',
        categories: ['embedded'],
        period: 'Spring 2026',
        role: 'Computer Organization (EEL 3801)',
        cover: { src: img('arm-instruction-counts.webp'), pos: '50% 50%' },
        summary:
            'Bare-metal ARMv7 assembly that scores DNA sequencing quality data, then re-engineered to cut branches by about half and shave roughly 4–5% off estimated dynamic energy.',
        tags: ['ARMv7 Assembly', 'Bare-metal', 'UART', 'DyARMic'],
        stats: [
            { value: '−47%', label: 'branch instructions (1,000 bases)' },
            { value: '−9%', label: 'total dynamic instructions' },
            { value: '~4–5%', label: 'estimated energy saved' },
        ],
        overview: [
            'The program walks a DNA sequence and its FASTQ quality string, skips invalid “N” bases, converts each ASCII quality character to a Phred score (ASCII minus 33), keeps a running total, then divides by repeated subtraction and prints the total and average score over UART.',
            'Part A is the straightforward version: a branch-based loop that stops at the string’s null terminator and jumps over invalid bases. Part B keeps the same output but is rebuilt for energy efficiency. I measured both with the DyARMic dynamic-instruction counting tool and the course’s instruction-category energy model.',
            'I prototyped the algorithm in C first, then wrote and debugged the assembly in the CPUlator simulator.',
        ],
        highlights: [
            'Pointer-based traversal of two data streams (genome and FASTQ) with post-indexed loads, kept aligned even when a base is skipped.',
            'Part B replaced the null-terminator check with a fixed loop counter, and removed the skip branch by using conditional execution (MOVEQ / MOVNE) and multiplying each score by a 0-or-1 mask.',
            'At 1,000 bases the optimized version needs 1,138 branch instructions instead of 2,139, and 10,386 total instructions instead of 11,388 (DyARMic counts).',
            'Analyzed cycles, CPI (about 2.6), energy, and MIPS across sequence lengths from 200 to 1,000 bases, and plotted how each grows with length.',
            'Wrote UART routines for printing strings and numbers, and division by repeated subtraction with a divisor table.',
            'Tested with four cases in CPUlator: all-valid input, a skipped base, all-invalid input, and a full 1,000-base dataset (total 32,072, score 32%).',
        ],
        table: {
            title: 'Results',
            columns: ['Sequence length', 'Total instructions', 'Branch instructions', 'Est. dynamic energy'],
            rows: [
                ['800 bases', '9,188 → 8,386  (−9%)', '1,739 → 938  (−46%)', '96,741 → 92,686 nJ  (−4.2%)'],
                ['1,000 bases', '11,388 → 10,386  (−9%)', '2,139 → 1,138  (−47%)', '120,141 → 115,086 nJ  (−4.2%)'],
            ],
            note: 'Baseline → optimized. Counts are from DyARMic. Energy uses the course model: ALU 1 nJ, branch 5 nJ, byte memory access 50 nJ, register-to-register memory 3 nJ.',
        },
        figures: [
            {
                src: img('arm-instruction-counts.webp'),
                alt: 'Bar charts comparing total and branch instruction counts for the baseline and optimized programs at 800 and 1,000 bases',
                caption: 'Baseline vs. optimized instruction counts from DyARMic',
                wide: true,
            },
        ],
        statusNote: 'Completed course project. Energy figures are estimates from the course’s instruction-count model, not hardware measurements.',
        stack: ['ARMv7 Assembly', 'C (prototype)', 'CPUlator', 'DyARMic', 'UART'],
    },
    {
        id: 'fm-pll',
        title: 'FM Modulation & PLL Demodulation',
        status: 'LAB PROJECT',
        tone: 'yellow',
        icon: 'wave',
        categories: ['circuits'],
        period: 'Spring 2026',
        role: 'Lab project with a partner',
        cover: { src: img('fm-pll-setup.webp'), pos: '50% 55%' },
        summary:
            'Built and measured an FM modulator (XR2206 VCO) and a phase-locked-loop demodulator (LM565) that recovers the original message signal.',
        tags: ['XR2206', 'LM565 PLL', 'TL084', 'Oscilloscope'],
        stats: [
            { value: '−3.2 kHz/V', label: 'VCO voltage-to-frequency gain' },
            { value: '≈ 20 kHz', label: 'peak frequency deviation' },
            { value: 'LM565', label: 'PLL recovers the message' },
        ],
        overview: [
            'This lab explored how frequency modulation is generated and recovered. We built an FM modulator around the XR2206 voltage-controlled oscillator, characterized how its output frequency moves with input voltage, and applied both sine-wave and square-wave messages.',
            'We then built an LM565 phase-locked loop to demodulate the FM signal and compared the recovered waveform with the original input.',
        ],
        highlights: [
            'Measured the VCO’s voltage-to-frequency conversion and found its gain constant (about −3.2 kHz per volt), then confirmed the input-voltage-to-frequency relationship.',
            'Found the maximum and minimum output frequencies from oscilloscope reference points (about 121 kHz and 80.8 kHz) to work out peak frequency deviation, modulation index, and FM bandwidth.',
            'Set up the zero-carrier condition and observed the carrier component disappear from the FM signal.',
            'Built the PLL demodulator, which tracked the FM signal and recovered a message very close to the original; compared sine and square-wave inputs.',
        ],
        figures: [
            { src: img('fm-pll-setup.webp'), alt: 'Breadboard with the XR2206 and jumper wires connected to bench power leads', caption: 'FM modulator / PLL circuit on the breadboard' },
            { src: img('fm-waveform.webp'), alt: 'Oscilloscope screen showing an FM waveform whose frequency changes over time', caption: 'FM waveform on the oscilloscope' },
            { src: img('fm-demod-build.webp'), alt: 'Breadboard with the LM565 demodulator circuit and many colored jumper wires', caption: 'Building the FM demodulator' },
        ],
        statusNote:
            'Completed lab (April 2026). Measured results generally agreed with the theory; small differences were attributed to component tolerances and measurement limits. Gain and deviation values are from my lab notes.',
        stack: ['XR2206 VCO', 'LM565 PLL', 'TL084 op-amp', 'R&S RTM3004 oscilloscope', 'Tektronix AFG 3022B', 'Tektronix DMM4050', 'Agilent E3630A supply'],
    },
    {
        id: 'amplifier-design',
        title: 'Transistor Amplifier Design',
        status: 'COURSE PROJECT',
        tone: 'pink',
        icon: 'bolt',
        categories: ['circuits'],
        period: 'Spring 2026',
        role: 'Electronics course project',
        summary:
            'Designed, simulated, built, and tested BJT amplifier circuits, comparing hand calculations, Multisim, and bench measurements.',
        tags: ['BJT', 'Multisim', 'Frequency response', 'Breadboard'],
        overview: [
            'Designed transistor-based amplifiers to meet specified performance requirements using transistor biasing, small-signal analysis, and frequency-response concepts.',
            'Each design was simulated in Multisim, prototyped on a breadboard, and measured on the bench.',
        ],
        highlights: [
            'Compared theoretical calculations, circuit simulations, and experimental measurements to evaluate gain, bandwidth, and overall performance.',
            'Validated BJT circuit behavior against Multisim results using an oscilloscope and function generator.',
        ],
        statusNote: 'Completed course project. Measurements and a fuller write-up are still to be added.',
        stack: ['BJT circuits', 'Multisim', 'Oscilloscope', 'Function generator', 'Breadboard'],
    },
    {
        id: 'wind-farm',
        title: 'Wind Farm Transmission System',
        status: 'COURSE PROJECT',
        tone: 'blue',
        icon: 'turbine',
        categories: ['circuits'],
        period: 'Fall 2025',
        role: 'Intro to Power Systems',
        cover: { src: img('wind-final-system.webp'), pos: '50% 45%' },
        summary:
            'Connected a new 200 MW wind farm to a power system, using PowerWorld power-flow and N-1 contingency analysis to find a compliant, low-cost design.',
        tags: ['PowerWorld', 'Power flow', 'N-1 contingency', 'Cost analysis'],
        stats: [
            { value: '200 MW', label: 'wind farm at 69 kV' },
            { value: '57', label: 'N-1 contingencies checked' },
            { value: '0', label: 'violations in the final design' },
            { value: '$8.759M', label: 'capital construction cost' },
        ],
        overview: [
            'Cedar Creek Wind (CCW) is adding a 200 MW farm to the Metropolis Light and Power system. The design had to give the new substation at least two separate feeds, keep bus voltages between 0.95 and 1.10 per unit, keep line flows under 100% of their limit, and survive the loss of any single line or transformer, while minimizing construction cost plus five years of system losses.',
            'I worked in PowerWorld Simulator: run a baseline N-1 study, add the wind farm, then reinforce the network until the contingency report was clean.',
        ],
        highlights: [
            'Ran a baseline N-1 study of the existing system first (6 violations, with branch loadings up to about 111%) to see where the network was already weak.',
            'Connected the wind farm through a 138/69 kV transformer to LYNN and 69 kV lines to WOLEN and SHIMKO, and added a BOB–SHIMKO line to relieve the overloaded corridors.',
            'Iterated until the full contingency report showed zero violations with voltages inside 0.95–1.10 p.u.; system losses in the final case were 10.32 MW.',
            'Hand-calculated per-unit line impedances from conductor data and line length, and costed every addition.',
            'Proposed a cheaper alternative I did not build: reinforcing SAVOY–SHIMKO instead of the long CCW–WOLEN line, estimated to save about $1M and reduce bottleneck risk.',
        ],
        table: {
            title: 'Cost breakdown',
            columns: ['Addition', 'Voltage', 'Length', 'Estimated cost'],
            rows: [
                ['CCW → LYNN transformer', '138 / 69 kV', '—', '$1.400M'],
                ['CCW → WOLEN line', '69 kV', '17.70 km', '$3.665M'],
                ['CCW → SHIMKO line', '69 kV', '6.44 km', '$1.413M'],
                ['BOB → SHIMKO line', '69 kV', '10.78 km', '$2.281M'],
                ['Total capital construction cost', '', '', '$8.759M'],
            ],
            note: 'A new 69 kV line costs $125K plus $200K per km, per the course cost sheet.',
        },
        figures: [
            {
                src: img('wind-final-system.webp'),
                alt: 'PowerWorld one-line diagram of the final transmission system with the 200 MW wind farm connected',
                caption: 'Final PowerWorld system with the wind farm connected (system losses 10.32 MW)',
                wide: true,
            },
        ],
        statusNote: 'Completed course project with a written technical report.',
        stack: ['PowerWorld Simulator', 'Power flow', 'N-1 contingency analysis', 'Per-unit line calculations'],
    },
    {
        id: 'orange-race',
        title: 'Great Navel Orange Race Autonomous Vessel',
        status: 'TEAM PROJECT',
        tone: 'green',
        icon: 'boat',
        categories: ['embedded'],
        period: 'EGN 1007C team project',
        role: 'Project Leader',
        summary:
            'Led a team building a lightweight vessel that steers itself around UCF’s Reflecting Pond using video-based distance tracking and Arduino servo control.',
        tags: ['Python', 'Arduino', 'Servo control', 'Computer vision'],
        links: [{ label: 'About the race (UCF CECS)', href: 'https://cecs.ucf.edu/GNOR/' }],
        overview: [
            'The Great Navel Orange Race (GNOR) is UCF’s annual College of Engineering and Computer Science event. As the end-of-semester team project for the freshman engineering course EGN 1007C, teams design, build, test, and race an autonomous vessel (no remote controls) around the Reflecting Pond.',
            'I led our team’s vessel. A Python video-tracking program measured distance and drove servo motors through an Arduino, with area-based visual feedback updating the steering target, and the hull was built light from Styrofoam and basswood.',
        ],
        highlights: [
            'Designed the video-based distance-tracking and steering-control system.',
            'Implemented visual feedback to update steering targets dynamically and support obstacle avoidance during testing.',
            'Led the team in building a lightweight hull from Styrofoam and basswood, balancing structural integrity against speed.',
        ],
        statusNote: 'Completed team project. Event details are from the CECS GNOR website.',
        stack: ['Python', 'Arduino', 'Servo motors', 'Video tracking'],
    },
    {
        id: 'nba-analytics',
        title: 'NBA Player Performance Tracker',
        status: 'PERSONAL PROJECT',
        tone: 'red',
        icon: 'chart',
        categories: ['software'],
        role: 'Creator and developer',
        summary:
            'A Streamlit dashboard that pulls NBA game logs, charts a player’s trends, and uses a random-forest model to forecast next-game points, rebounds, and assists.',
        tags: ['Python', 'Streamlit', 'scikit-learn', 'pandas'],
        stats: [
            { value: '6+', label: 'different stats predicted: points, rebounds, assists, steals, blocks, and etc' },
            { value: '300', label: 'decision trees in each model' },
            { value: '80 / 20', label: 'train / test split, kept in game order' },
        ],
        overview: [
            'A player-analytics app I built in Python. Type in a player, pick a season, and it loads their game logs, charts their trends, and predicts how they will do in their next game.',
            'To keep the predictions honest, every input is calculated only from games played before the one being predicted, and the model is tested on each player’s most recent games instead of a random sample.',
        ],
        highlights: [
            'Pulls each player’s regular-season, playoff, and play-in game logs from the NBA stats API, with retry handling.',
            'Engineers features with no look-ahead: 3, 5, and 10-game rolling averages, a season-to-date average, 5-game volatility, a short-versus-long trend, and recent minutes and shot-attempt volume.',
            'Trains random-forest regressors (300 trees, depth 8) for points, rebounds, and assists, and reports MAE, RMSE, and R² on a chronological holdout right in the app.',
            'Interactive Streamlit dashboard with player search, season and playoff filters, an adjustable rolling window, Altair trend charts, shooting-efficiency stats, and a full game log.',
            'Includes a table for lining up published player-prop lines against season, last-5, and last-10 averages (line sources are pluggable).',
        ],
        statusNote: 'Source code is not published yet. Predictions depend on the player and season selected, and this is a hobby analytics project, not betting advice.',
        stack: ['Python', 'Streamlit', 'scikit-learn', 'pandas', 'NumPy', 'Altair', 'nba_api'],
    },
]