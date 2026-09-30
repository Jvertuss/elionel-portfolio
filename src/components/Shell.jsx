import { SITE } from '../data.js'
import { AVATAR } from '../photos.js'
import Icon from './Icon.jsx'

const NAV = [
    { id: 'home', label: 'HOME', icon: 'home', href: '#/' },
    { id: 'about', label: 'ABOUT ME', icon: 'game', href: '#/about' },
    { id: 'projects', label: 'PROJECTS', icon: 'code', href: '#/projects' },
    { id: 'experience', label: 'EXPERIENCE', icon: 'briefcase', href: '#/experience' },
    { id: 'resume', label: 'RESUME', icon: 'doc', href: 'resume', external: true },
    { id: 'linkedin', label: 'LINKEDIN', icon: 'linkedin', href: 'linkedin', external: true },
    { id: 'contact', label: 'CONTACT', icon: 'mail', href: '#/contact' },
]

// Sidebar layout shared by the About and Contact screens.
export default function Shell({ active, children }) {
    return (
        <div className="shell">
            <aside className="shell-side">
                <a className="shell-brand" href="#/" aria-label="Home">
                    {AVATAR && <img className="shell-avatar" src={AVATAR.src} alt="" width="200" height="200" />}
                    <span className="shell-brand-text">
                        <span className="shell-name">{SITE.name}</span>
                        <span className="shell-sub">{SITE.major}<br />UCF</span>
                    </span>
                </a>
                <nav aria-label="Site">
                    <ul>
                        {NAV.map((n) => {
                            const href = n.href === 'resume' ? SITE.resume : n.href === 'linkedin' ? SITE.linkedin : n.href
                            return (
                                <li key={n.id}>
                                    <a
                                        href={href}
                                        className={n.id === active ? 'is-active' : ''}
                                        aria-current={n.id === active ? 'page' : undefined}
                                        {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        <Icon type={n.icon} size={100} />
                                        <span>{n.label}</span>
                                        {n.external && <span className="sr-only"> (opens in a new tab)</span>}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <p className="shell-motto" aria-hidden="true">Build.<br />Learn.<br />Create.</p>
            </aside>

            <div className="shell-main">
                <div className="shell-top">
                    <a className="shell-back" href="#/"><Icon type="back" size={100} /> Back to Home</a>
                </div>
                {children}
            </div>
        </div>
    )
}