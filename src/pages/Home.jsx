import { useEffect, useMemo, useRef, useState } from 'react'
import { HOME_ITEMS, HOME_NEIGHBORS, SITE } from '../data.js'
import { ORB_PHOTOS, PANEL_ART } from '../photos.js'
import Icon from '../components/Icon.jsx'

// Orb sits at the stage center of the menu seam (percent of the 16:9 stage).
const ORB = { x: 49, y: 43 }

const withAngle = (item) => {
    const [l, t, w, h] = item.box
    const dx = ((l + w / 2 - ORB.x) / 100) * 16
    const dy = ((t + h / 2 - ORB.y) / 100) * 9
    return { ...item, angle: (Math.atan2(dy, dx) * 180) / Math.PI }
}

const RAIL = [
    { id: 'home', icon: 'home', label: 'Home', href: '#/' },
    { id: 'about', icon: 'person', label: 'About me', href: '#/about' },
    { id: 'projects', icon: 'code', label: 'Projects', href: '#/projects' },
    { id: 'experience', icon: 'briefcase', label: 'Experience', href: '#/experience' },
    { id: 'contact', icon: 'mail', label: 'Contact', href: '#/contact' },
    { id: 'full', icon: 'list', label: 'Full portfolio (scrolling page)', href: '#/full' },
]

function useClock() {
    const [now, setNow] = useState(() => new Date())
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 15000)
        return () => clearInterval(id)
    }, [])
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
    const date = now
        .toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
        .toUpperCase()
        .replace(',', '')
    return { time, date }
}

export default function Home() {
    const panels = useMemo(() => HOME_ITEMS.map(withAngle), [])
    const [currentId, setCurrentId] = useState('projects')
    const refs = useRef({})
    const clock = useClock()

    // Warm the cache so the orb photo appears instantly the first time you hover a section.
    useEffect(() => {
        Object.values(ORB_PHOTOS).forEach((p) => { const i = new Image(); i.src = p.src })
    }, [])
    const current = panels.find((p) => p.id === currentId) || panels[0]
    const orbPhoto = ORB_PHOTOS[current.id]

    const hrefFor = (item) => {
        if (item.href === 'resume') return SITE.resume
        if (item.href === 'linkedin') return SITE.linkedin
        return item.href
    }

    // Arrow keys move the cursor between panels like a console menu.
    const onKeyDown = (e, item) => {
        const dir = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' }[e.key]
        if (!dir) return
        const nextId = HOME_NEIGHBORS[item.id]?.[dir]
        if (!nextId) return
        e.preventDefault()
        refs.current[nextId]?.focus()
    }

    return (
        <main className="home" aria-label="Portfolio menu">
            <h1 className="sr-only">Elionel Vertus — Electrical Engineering portfolio</h1>
            <div className="stage">
                <header className="stage-topbar">
                    <strong>{SITE.fullName.toUpperCase()}</strong>
                    <span>{SITE.major}</span>
                    <span>Embedded &amp; Firmware</span>
                    <span>UCF ’27</span>
                </header>

                <ul className="stage-panels">
                    {panels.map((item) => {
                        const [l, t, w, h] = item.box
                        const isCurrent = item.id === currentId
                        return (
                            <li
                                key={item.id}
                                className={`panel-wrap tone-${item.tone} ${isCurrent ? 'is-current' : ''}`}
                                style={{ '--l': `${l}%`, '--t': `${t}%`, '--w': `${w}%`, '--h': `${h}%`, '--clip': item.clip }}
                            >
                                <a
                                    ref={(el) => { refs.current[item.id] = el }}
                                    className={`panel panel-${item.id}`}
                                    style={{ '--body-left': `${item.body[0]}%`, '--body-width': `${item.body[1]}%` }}
                                    href={hrefFor(item)}
                                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    onMouseEnter={() => setCurrentId(item.id)}
                                    onFocus={() => setCurrentId(item.id)}
                                    onKeyDown={(e) => onKeyDown(e, item)}
                                    aria-label={item.external ? `${item.title} (opens in a new tab)` : item.title}
                                >
                                    {PANEL_ART[item.id] && (
                                        <img className="panel-art" src={PANEL_ART[item.id].src} alt="" aria-hidden="true" draggable="false" decoding="async" />
                                    )}
                                    <span className="panel-shine" aria-hidden="true" />
                                    <span className="panel-mark" aria-hidden="true"><Icon type={item.icon} size={400} /></span>
                                    {item.number && <span className="panel-number" aria-hidden="true">{item.number}</span>}
                                    <span className="panel-body">
                                        <span className="panel-icon" aria-hidden="true"><Icon type={item.icon} size={100} /></span>
                                        <strong className="panel-title">{item.title}</strong>
                                        {item.subtitle && <span className="panel-sub">{item.subtitle}</span>}
                                    </span>
                                    <span className="panel-desc">{item.description}</span>
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <div
                    className={`orb tone-${current.tone}`}
                    style={{ '--angle': `${current.angle}deg` }}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    <div className="orb-arrow-orbit" aria-hidden="true"><span className="orb-arrow" /></div>
                    <div className="orb-ring" aria-hidden="true" />
                    <div className={`orb-face ${orbPhoto ? 'has-photo' : ''}`} key={current.id}>
                        {orbPhoto && (
                            <img className="orb-photo" src={orbPhoto.src} alt="" aria-hidden="true" draggable="false" style={{ objectPosition: orbPhoto.pos }} />
                        )}
                        <Icon type={current.icon} size={100} className="orb-icon" />
                        <p className="orb-title">{current.title}</p>
                        <span className="orb-line" aria-hidden="true" />
                        <p className="orb-text">{current.description}</p>
                    </div>
                </div>

                <nav className="rail" aria-label="Quick navigation">
                    <ul>
                        {RAIL.map((r) => (
                            <li key={r.id}>
                                <a href={r.href} className={r.id === 'home' ? 'is-active' : ''} aria-label={r.label} title={r.label} aria-current={r.id === 'home' ? 'page' : undefined}>
                                    <Icon type={r.icon} size={100} />
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="rail-clock" aria-hidden="true">
                        <span className="rail-time">{clock.time}</span>
                        <span className="rail-date">{clock.date}</span>
                    </div>
                </nav>

                <footer className="stage-bottom">
                    <p>Turning ideas into meaningful solutions.</p>
                    <a className="portfolio-btn" href="#/full">
                        <Icon type="list" size={100} />
                        <span>View full portfolio</span>
                        <Icon type="forward" size={100} />
                    </a>
                </footer>
            </div>
        </main>
    )
}