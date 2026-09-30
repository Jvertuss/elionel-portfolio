import { useRef, useState } from 'react'
import { EXPERIENCES } from '../data.js'
import { PROJECTS } from '../projects.js'
import { EXPERIENCE_PHOTOS } from '../photos.js'
import Icon from '../components/Icon.jsx'

function ExpBar({ backHref, backLabel, title, message }) {
    return (
        <header className="exp-bar">
            <a className="exp-back" href={backHref} aria-label={backLabel}>
                <Icon type="back" size={100} />
            </a>
            <div className="exp-heading">
                <Icon type="briefcase" size={100} />
                <strong>{title}</strong>
            </div>
            <p className="exp-message">{message}</p>
            <span className="exp-words" aria-hidden="true">BUILD ▸ LEARN ▸ GROW</span>
        </header>
    )
}

export default function ExperiencePage() {
    const [selectedId, setSelectedId] = useState(EXPERIENCES[0].id)
    const tileRefs = useRef([])
    const gridRef = useRef(null)
    const selected = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0]
    const selectedPhoto = EXPERIENCE_PHOTOS[selected.id]

    const onTileKey = (e, index) => {
        const cols = gridRef.current
            ? getComputedStyle(gridRef.current).gridTemplateColumns.split(' ').length
            : 1
        const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -cols, ArrowDown: cols }[e.key]
        if (!step) return
        const next = index + step
        if (next < 0 || next >= EXPERIENCES.length) return
        e.preventDefault()
        tileRefs.current[next]?.focus()
    }

    return (
        <main className="exp">
            <ExpBar backHref="#/" backLabel="Back to home" title="EXPERIENCE SELECT" message="Choose a role to view details." />
            <h1 className="sr-only">Experience</h1>

            <ul className="exp-grid" ref={gridRef}>
                {EXPERIENCES.map((item, i) => (
                    <li key={item.id}>
                        <button
                            type="button"
                            ref={(el) => { tileRefs.current[i] = el }}
                            className={`tile tone-${item.tone} ${item.id === selectedId ? 'is-selected' : ''}`}
                            aria-pressed={item.id === selectedId}
                            onMouseEnter={() => setSelectedId(item.id)}
                            onFocus={() => setSelectedId(item.id)}
                            onClick={() => setSelectedId(item.id)}
                            onKeyDown={(e) => onTileKey(e, i)}
                        >
                            <span className="tile-art" aria-hidden="true"><Icon type={item.icon} size={100} /></span>
                            <span className="tile-label">
                                <strong>{item.title}</strong>
                                <span>{item.subtitle}</span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            <section className={`exp-preview tone-${selected.tone}`} aria-live="polite" aria-label="Selected experience">
                <div className="exp-preview-main" key={selected.id}>
                    <span className="eyebrow">SELECTED EXPERIENCE</span>
                    <div className="exp-preview-title">
                        <span className="exp-preview-icon" aria-hidden="true"><Icon type={selected.icon} size={100} /></span>
                        <div>
                            <h2>{selected.title}</h2>
                            <h3>{selected.org}</h3>
                            <p><Icon type="calendar" size={100} /> {selected.date}</p>
                        </div>
                    </div>
                    <ul className="exp-bullets">
                        {selected.bullets.map((b) => <li key={b}>{b}</li>)}
                    </ul>
                    <a className="yellow-btn" href={`#/experience/${selected.id}`}>
                        Open full details <Icon type="forward" size={100} />
                    </a>
                </div>
                <aside className="exp-preview-side" key={`${selected.id}-side`}>
                    <span className="eyebrow">SKILLS USED</span>
                    <ul className="chips">
                        {selected.tags.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                    <p className="exp-preview-note">{selected.overview}</p>
                    {selectedPhoto && (
                        <figure className="exp-photo">
                            <img src={selectedPhoto.src} alt={selectedPhoto.alt} loading="lazy" decoding="async" style={{ objectPosition: selectedPhoto.pos }} />
                            <figcaption>{selectedPhoto.caption}</figcaption>
                        </figure>
                    )}
                </aside>
            </section>

            <footer className="exp-foot">
                <span>SELECT AN EXPERIENCE</span>
                <span className="exp-foot-keys"><kbd>←↑↓→</kbd> Select <kbd>Enter</kbd> Open <kbd>Esc</kbd> Back</span>
            </footer>
        </main>
    )
}

export function ExperienceDetail({ item }) {
    const project = item.project ? PROJECTS.find((p) => p.id === item.project) : null
    const photo = EXPERIENCE_PHOTOS[item.id]
    const index = EXPERIENCES.findIndex((e) => e.id === item.id)
    const prev = EXPERIENCES[(index - 1 + EXPERIENCES.length) % EXPERIENCES.length]
    const next = EXPERIENCES[(index + 1) % EXPERIENCES.length]

    return (
        <main className="exp exp-detail">
            <ExpBar backHref="#/experience" backLabel="Back to experience select" title="EXPERIENCE DETAILS" message={item.subtitle} />

            <section className={`exp-hero tone-${item.tone}`}>
                <span className="exp-hero-icon" aria-hidden="true"><Icon type={item.icon} size={100} /></span>
                <div>
                    <span className="eyebrow">{item.date}</span>
                    <h1>{item.title}</h1>
                    <h2>{item.org}</h2>
                </div>
                {photo && (
                    <figure className="exp-hero-photo">
                        <img src={photo.src} alt={photo.alt} decoding="async" style={{ objectPosition: photo.pos }} />
                        <figcaption>{photo.caption}</figcaption>
                    </figure>
                )}
            </section>

            <div className="exp-detail-grid">
                <article className="panel-dark">
                    <h3>Overview</h3>
                    <p>{item.overview}</p>
                    {project && (
                        <a className="yellow-btn" href={`#/projects/${project.id}`}>
                            See the related project <Icon type="forward" size={100} />
                        </a>
                    )}
                </article>
                <article className="panel-dark">
                    <h3>What I do</h3>
                    <ul className="exp-bullets">{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                </article>
                <article className="panel-dark">
                    <h3>Skills used</h3>
                    <ul className="chips">{item.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </article>
            </div>

            <nav className="detail-pager dark" aria-label="More experience">
                <a href={`#/experience/${prev.id}`}><Icon type="back" size={100} /> <span><small>Previous</small>{prev.title}</span></a>
                <a href="#/experience" className="detail-pager-mid">All experience</a>
                <a href={`#/experience/${next.id}`}><span><small>Next</small>{next.title}</span> <Icon type="forward" size={100} /></a>
            </nav>
        </main>
    )
}