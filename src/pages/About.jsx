import { useCallback, useState } from 'react'
import { ABOUT, SIDE_QUESTS, SITE } from '../data.js'
import { GALLERY, HERO, QUEST_PHOTOS } from '../photos.js'
import Icon from '../components/Icon.jsx'
import Shell from '../components/Shell.jsx'
import Lightbox from '../components/Lightbox.jsx'

export default function AboutPage() {
    const [open, setOpen] = useState(null)
    const close = useCallback(() => setOpen(null), [])

    return (
        <Shell active="about">
            <main className="about">
                <section className="about-hero">
                    <div className="about-photo">
                        {HERO ? (
                            <img src={HERO.src} alt={HERO.alt} />
                        ) : (
                            <div className="about-badge" aria-hidden="true">
                                <span>EV</span>
                            </div>
                        )}
                    </div>
                    <div className="about-intro">
                        <span className="label-blue">HEY, I’M</span>
                        <h1>{SITE.name}</h1>
                        <p className="about-role">{ABOUT.role}</p>
                        <p className="about-copy">{ABOUT.intro}</p>
                        <div className="about-actions">
                            <a className="btn-blue" href={SITE.resume} target="_blank" rel="noopener noreferrer">
                                <Icon type="doc" size={100} /> View résumé <span className="sr-only">(opens in a new tab)</span>
                            </a>
                            <a className="btn-ghost" href="#/projects">See projects <Icon type="forward" size={100} /></a>
                        </div>
                    </div>
                </section>

                <div className="about-cols">
                    <section className="card-dark">
                        <h2 className="ribbon">QUICK FACTS</h2>
                        <dl className="facts">
                            {ABOUT.quickFacts.map(([k, v]) => (
                                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                            ))}
                        </dl>
                    </section>

                    <section className="card-dark">
                        <h2 className="ribbon">INTERESTS</h2>
                        <ul className="interests">
                            {ABOUT.interests.map(([icon, label]) => (
                                <li key={label}><Icon type={icon} size={100} /><span>{label}</span></li>
                            ))}
                        </ul>
                    </section>

                    <section className="card-dark">
                        <h2 className="ribbon">FUN FACTS</h2>
                        <ul className="funfacts">
                            {ABOUT.funFacts.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                    </section>
                </div>

                <section className="card-dark loadout">
                    <h2 className="ribbon ribbon-green">SKILL LOADOUT</h2>
                    <div className="loadout-grid">
                        {ABOUT.skills.map((group) => (
                            <div key={group.label} className={`loadout-group tone-${group.tone}`}>
                                <h3>{group.label}</h3>
                                <ul className="chips">{group.items.map((i) => <li key={i}>{i}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                    <p className="loadout-course"><strong>Relevant coursework:</strong> {ABOUT.coursework}</p>
                </section>

                <section className="card-dark quests">
                    <div className="quests-head">
                        <h2 className="ribbon ribbon-pink">SIDE QUESTS</h2>
                        <span>Things I do beyond the lab</span>
                    </div>
                    <ul className="quest-grid">
                        {SIDE_QUESTS.map((q) => {
                            const photo = QUEST_PHOTOS[q.title]
                            return (
                                <li key={q.title} className={`quest tone-${q.tone} ${photo ? 'has-photo' : ''}`}>
                                    {photo && (
                                        <div className="quest-photo">
                                            <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" style={{ objectPosition: photo.pos }} />
                                        </div>
                                    )}
                                    <span className="quest-icon" aria-hidden="true"><Icon type={q.icon} size={100} /></span>
                                    <h3>{q.title}</h3>
                                    <small>{q.category}</small>
                                    <p>{q.description}</p>
                                    <ul className="chips">{q.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                                </li>
                            )
                        })}
                    </ul>
                </section>

                <section className="card-dark gallery" aria-labelledby="gallery-title">
                    <div className="quests-head">
                        <h2 className="ribbon ribbon-green" id="gallery-title">PHOTO GALLERY</h2>
                        <span>Some moments from outside the lab</span>
                    </div>
                    <ul className="gallery-grid">
                        {GALLERY.map((p, i) => (
                            <li key={p.id} className={`gallery-item tone-${p.tone} ${p.wide ? 'is-wide' : ''}`}>
                                <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
                                    <img src={p.src} alt={p.alt} loading="lazy" decoding="async" style={{ objectPosition: p.pos }} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            {open !== null && <Lightbox items={GALLERY} index={open} onClose={close} onChange={setOpen} />}
        </Shell>
    )
}