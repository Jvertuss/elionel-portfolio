import { ABOUT, EXPERIENCES, SITE } from '../data.js'
import { PROJECTS } from '../projects.js'
import Icon from '../components/Icon.jsx'

// A plain, scrolling version of the portfolio for anyone who prefers a normal page.
export default function FullPortfolio() {
    return (
        <div className="full">
            <header className="full-head">
                <div>
                    <strong>{SITE.fullName}</strong>
                    <span>{SITE.major} • UCF • Expected Spring 2027</span>
                </div>
                <nav aria-label="Page sections">
                    <a href="#full-experience">Experience</a>
                    <a href="#full-projects">Projects</a>
                    <a href="#full-skills">Skills</a>
                    <a href="#/" className="full-menu">Game menu <Icon type="forward" size={100} /></a>
                </nav>
            </header>

            <main className="full-main">
                <section className="full-intro">
                    <span className="label-blue">ABOUT</span>
                    <h1>Hi, I’m Elionel.</h1>
                    <p>{ABOUT.intro}</p>
                    <div className="about-actions">
                        <a className="btn-blue" href={SITE.resume} target="_blank" rel="noopener noreferrer">
                            <Icon type="doc" size={100} /> Résumé <span className="sr-only">(opens in a new tab)</span>
                        </a>
                        <a className="btn-ghost" href={`mailto:${SITE.email}`}><Icon type="mail" size={100} /> {SITE.email}</a>
                        <a className="btn-ghost" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                            <Icon type="linkedin" size={100} /> LinkedIn <span className="sr-only">(opens in a new tab)</span>
                        </a>
                    </div>
                </section>

                <section id="full-experience" className="full-section">
                    <span className="label-blue">EXPERIENCE</span>
                    <h2>Experience</h2>
                    <ul className="full-list">
                        {EXPERIENCES.map((e) => (
                            <li key={e.id} className={`tone-${e.tone}`}>
                                <div className="full-list-head">
                                    <h3>{e.title}</h3>
                                    <span>{e.date}</span>
                                </div>
                                <p className="full-org">{e.org}</p>
                                <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="full-projects" className="full-section">
                    <span className="label-blue">PROJECTS</span>
                    <h2>Projects</h2>
                    <ul className="full-projects">
                        {PROJECTS.map((p) => (
                            <li key={p.id} className={`tone-${p.tone}`}>
                                <span className="full-status">{p.status}</span>
                                <h3><a href={`#/projects/${p.id}`}>{p.title}</a></h3>
                                <p className="full-org">{p.role} • {p.period}</p>
                                <p>{p.summary}</p>
                                <ul className="chips">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="full-skills" className="full-section">
                    <span className="label-blue">SKILLS</span>
                    <h2>Skills</h2>
                    <div className="loadout-grid">
                        {ABOUT.skills.map((g) => (
                            <div key={g.label} className={`loadout-group tone-${g.tone}`}>
                                <h3>{g.label}</h3>
                                <ul className="chips">{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="full-foot">
                <span>{SITE.fullName} • {SITE.email}</span>
                <a href="#/">Back to game menu</a>
            </footer>
        </div>
    )
}