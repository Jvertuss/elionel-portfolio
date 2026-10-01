import { useState } from 'react'
import { HOME_ITEMS, SITE } from '../data.js'
import { PROJECTS } from '../projects.js'
import { AVATAR } from '../photos.js'
import Icon from '../components/Icon.jsx'

// Short captions for the big touch buttons.
const CAPTION = {
    experience: 'Research • Firmware',
    about: 'Who I am',
    resume: 'Open the PDF',
    projects: 'Embedded • Circuits • Power',
    linkedin: 'Connect',
    contact: 'Say hello',
}

// Mario Kart DS-style phone menu: a "top screen" driver card and a "touch screen" of big buttons.
export default function MobileHome() {
    const [currentId, setCurrentId] = useState(null)
    const current = HOME_ITEMS.find((i) => i.id === currentId)

    const hrefFor = (item) => {
        if (item.href === 'resume') return SITE.resume
        if (item.href === 'linkedin') return SITE.linkedin
        return item.href
    }

    return (
        <main className="mk" aria-label="Portfolio menu">
            <h1 className="sr-only">Elionel Vertus — Electrical Engineering portfolio</h1>

            {/* ---------- top screen ---------- */}
            <section className="mk-top" aria-label="About this site">
                <div className="mk-bezel">
                    <div className="mk-screen">
                        <div className="mk-flagband" aria-hidden="true" />
                        <div className="mk-profile">
                            {AVATAR && <img className="mk-avatar" src={AVATAR.src} alt="" width="200" height="200" />}
                            <div className="mk-who">
                                <span className="mk-eyebrow">PLAYER 1</span>
                                <strong className="mk-name">{SITE.fullName.toUpperCase()}</strong>
                                <span className="mk-role">{SITE.major} • UCF ’27</span>
                            </div>
                        </div>
                        <ul className="mk-chips" aria-label="Quick facts">
                            <li>Embedded &amp; Firmware</li>
                            <li>STM32</li>
                            <li>{PROJECTS.length} projects</li>
                        </ul>
                        <p className="mk-hint" aria-live="polite">
                            {current ? <><b>{current.title}</b> — {current.description}</> : 'Tap a mode to start!'}
                        </p>
                        <div className="mk-flagband is-bottom" aria-hidden="true" />
                    </div>
                </div>
            </section>

            <div className="mk-hinge" aria-hidden="true"><i /><i /><i /></div>

            {/* ---------- touch screen ---------- */}
            <nav className="mk-bottom" aria-label="Main menu">
                <ul className="mk-buttons">
                    {HOME_ITEMS.map((item) => (
                        <li key={item.id} className={`mk-item mk-${item.id}`}>
                            <a
                                className={`mk-btn tone-${item.tone}`}
                                href={hrefFor(item)}
                                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                onPointerDown={() => setCurrentId(item.id)}
                                onFocus={() => setCurrentId(item.id)}
                                aria-label={item.external ? `${item.title} (opens in a new tab)` : item.title}
                            >
                                <span className="mk-ico" aria-hidden="true"><Icon type={item.icon} size={100} /></span>
                                <span className="mk-text">
                                    <strong className="mk-label">{item.title}</strong>
                                    <span className="mk-sub">{CAPTION[item.id]}</span>
                                </span>
                                {item.external && <span className="mk-ext" aria-hidden="true"><Icon type="external" size={100} /></span>}
                            </a>
                        </li>
                    ))}
                </ul>

                <a className="mk-full" href="#/full">
                    <Icon type="list" size={100} /> View full portfolio
                </a>
            </nav>
        </main>
    )
}