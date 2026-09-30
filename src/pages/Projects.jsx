import { useMemo, useState } from 'react'
import { PROJECT_FILTERS } from '../data.js'
import { PROJECTS } from '../projects.js'
import Icon from '../components/Icon.jsx'

// If a cover image can't load (file missing), drop it and show the colored art + icon instead.
function CoverImage({ cover }) {
    const [failed, setFailed] = useState(false)
    if (failed) return null
    return (
        <img
            className="card-cover"
            src={cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: cover.pos }}
            onError={() => setFailed(true)}
        />
    )
}

// A figure that simply disappears if its image can't load.
function FigureItem({ figure }) {
    const [failed, setFailed] = useState(false)
    if (failed) return null
    return (
        <li className={figure.wide ? 'is-wide' : ''}>
            <figure>
                <a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${figure.caption} (new tab)`}>
                    <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
                </a>
                <figcaption>{figure.caption}</figcaption>
            </figure>
        </li>
    )
}

function BoardBar({ backHref, backLabel, trail, right }) {
    return (
        <header className="board-bar">
            <a className="board-back" href={backHref} aria-label={backLabel}>
                <Icon type="back" size={100} />
            </a>
            <div className="board-title">
                <strong>PROJECT BOARD</strong>
                <span aria-hidden="true">›</span>
                <em>{trail}</em>
            </div>
            {right}
        </header>
    )
}

export default function ProjectsPage() {
    const [filter, setFilter] = useState('all')
    const [selectedId, setSelectedId] = useState(PROJECTS[0].id)

    const shown = useMemo(
        () => PROJECTS.filter((p) => filter === 'all' || p.categories.includes(filter)),
        [filter],
    )
    const selected = shown.find((p) => p.id === selectedId) || shown[0]

    return (
        <main className="board">
            <BoardBar
                backHref="#/"
                backLabel="Back to home"
                trail="Select a project"
                right={
                    <div className="board-filters" role="group" aria-label="Filter projects">
                        {PROJECT_FILTERS.map((f) => (
                            <button
                                key={f.id}
                                type="button"
                                className={filter === f.id ? 'is-on' : ''}
                                aria-pressed={filter === f.id}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                }
            />

            <div className="board-meta">
                <h1 className="sr-only">Projects</h1>
                <span>Choose a card to open the full write-up.</span>
                <strong aria-live="polite">
                    <Icon type="list" size={100} /> {shown.length} / {PROJECTS.length}
                </strong>
            </div>

            <ul className="board-grid">
                {shown.map((p) => (
                    <li key={p.id}>
                        <a
                            className={`card tone-${p.tone} ${selected?.id === p.id ? 'is-selected' : ''}`}
                            href={`#/projects/${p.id}`}
                            onMouseEnter={() => setSelectedId(p.id)}
                            onFocus={() => setSelectedId(p.id)}
                        >
                            <span className="card-rank">
                                <span className="card-star" aria-hidden="true">★</span>
                                {p.status}
                                {p.period && <span className="card-period">{p.period}</span>}
                            </span>
                            <span className="card-art" aria-hidden="true">
                                {p.cover && <CoverImage cover={p.cover} />}
                                <Icon type={p.icon} size={100} />
                            </span>
                            <span className="card-name">
                                <span>{p.title}</span>
                                <Icon type="forward" size={100} />
                            </span>
                            <span className="card-summary">{p.summary}</span>
                            <span className="card-tags">
                                {p.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>

            <footer className="board-foot">
                <span className="board-foot-label">MY PROJECTS</span>
                <p>
                    {selected ? (<><b>{selected.title}</b> • {selected.tags.join(' • ')}</>) : 'No projects match this filter.'}
                </p>
                <span className="board-foot-keys"><kbd>Enter</kbd> Open <kbd>Esc</kbd> Back</span>
            </footer>
        </main>
    )
}

export function ProjectDetail({ project }) {
    const index = PROJECTS.findIndex((p) => p.id === project.id)
    const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
    const next = PROJECTS[(index + 1) % PROJECTS.length]

    return (
        <main className="board detail">
            <BoardBar backHref="#/projects" backLabel="Back to project board" trail={project.title} />

            <section className={`detail-hero tone-${project.tone}`}>
                <div className="detail-art" aria-hidden="true"><Icon type={project.icon} size={100} /></div>
                <div className="detail-head">
                    <span className="detail-status">{project.status}</span>
                    <h1>{project.title}</h1>
                    <p className="detail-role">{project.role}</p>
                    {project.period && <p className="detail-period"><Icon type="calendar" size={100} /> {project.period}</p>}
                    {project.links?.length > 0 && (
                        <div className="detail-links">
                            {project.links.map((l) => (
                                <a key={l.href} className="detail-link" href={l.href} target="_blank" rel="noopener noreferrer">
                                    {l.label} <Icon type="external" size={100} /><span className="sr-only"> (opens in a new tab)</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {project.stats?.length > 0 && (
                <ul className={`detail-stats tone-${project.tone}`} aria-label="Key numbers">
                    {project.stats.map((st) => (
                        <li key={st.label}><strong>{st.value}</strong><span>{st.label}</span></li>
                    ))}
                </ul>
            )}

            <div className="detail-grid">
                <article className="sheet sheet-wide">
                    <h2>Overview</h2>
                    {project.overview.map((para) => <p key={para}>{para}</p>)}
                </article>

                <div className="detail-cols">
                    <div className="detail-main">
                        {project.highlights.length > 0 && (
                            <article className="sheet">
                                <h2>{project.status === 'IN PROGRESS' || project.status === 'RESEARCH' ? 'What I’m doing' : 'What I did'}</h2>
                                <ul>{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                            </article>
                        )}

                        {project.architecture && (
                            <article className="sheet">
                                <h2>{project.architecture.heading}</h2>
                                <ul>{project.architecture.items.map((h) => <li key={h}>{h}</li>)}</ul>
                            </article>
                        )}
                    </div>
                    <div className="detail-side">
                        <article className="sheet">
                            <h2>Status</h2>
                            <p>{project.statusNote}</p>
                        </article>

                        {project.stack.length > 0 && (
                            <article className="sheet">
                                <h2>Tools &amp; tech</h2>
                                <ul className="chips">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                            </article>
                        )}
                    </div>
                </div>

                {project.table && (
                    <article className="sheet sheet-wide">
                        <h2>{project.table.title || 'By the numbers'}</h2>
                        <div className="table-wrap">
                            <table className="data-table">
                                <thead>
                                    <tr>{project.table.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {project.table.rows.map((row, i) => (
                                        <tr key={row[0]} className={i === project.table.rows.length - 1 && /^total/i.test(row[0]) ? 'is-total' : ''}>
                                            {row.map((cell, j) => (j === 0 ? <th key={j} scope="row">{cell}</th> : <td key={j}>{cell}</td>))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {project.table.note && <p className="table-note">{project.table.note}</p>}
                    </article>
                )}

                {project.figures?.length > 0 && (
                    <article className="sheet sheet-wide">
                        <h2>Figures</h2>
                        <ul className="figure-grid">
                            {project.figures.map((f) => <FigureItem key={f.src} figure={f} />)}
                        </ul>
                    </article>
                )}
            </div>

            <nav className="detail-pager" aria-label="More projects">
                <a href={`#/projects/${prev.id}`}><Icon type="back" size={100} /> <span><small>Previous</small>{prev.title}</span></a>
                <a href="#/projects" className="detail-pager-mid">All projects</a>
                <a href={`#/projects/${next.id}`}><span><small>Next</small>{next.title}</span> <Icon type="forward" size={100} /></a>
            </nav>
        </main>
    )
}