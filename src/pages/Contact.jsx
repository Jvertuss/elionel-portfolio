import { useEffect, useRef, useState } from 'react'
import { SITE } from '../data.js'
import { AVATAR } from '../photos.js'
import Icon from '../components/Icon.jsx'
import Shell from '../components/Shell.jsx'

export default function ContactPage() {
    const [copied, setCopied] = useState(false)
    const timer = useRef(null)
    useEffect(() => () => clearTimeout(timer.current), [])

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(SITE.email)
            setCopied(true)
            clearTimeout(timer.current)
            timer.current = setTimeout(() => setCopied(false), 2200)
        } catch {
            // Clipboard can be blocked; the mailto link above still works.
        }
    }

    return (
        <Shell active="contact">
            <main className="contact">
                <div className="contact-head">
                    {AVATAR && <img className="contact-avatar" src={AVATAR.src} alt={AVATAR.alt} width="200" height="200" />}
                    <div>
                        <span className="label-blue">CONTACT</span>
                        <h1>LET’S TALK.</h1>
                    </div>
                </div>
                <p className="contact-lead">
                    I’m looking for embedded, firmware, and electrical engineering opportunities. Email is the fastest way to reach me.
                </p>

                <ul className="contact-grid">
                    <li className="contact-card tone-blue">
                        <Icon type="mail" size={100} />
                        <div>
                            <strong>Email</strong>
                            <a className="contact-value" href={`mailto:${SITE.email}`}>{SITE.email}</a>
                            <div className="contact-actions">
                                <a className="btn-blue" href={`mailto:${SITE.email}`}>Send an email</a>
                                <button type="button" className="btn-ghost" onClick={copyEmail}>
                                    <Icon type={copied ? 'check' : 'copy'} size={100} /> {copied ? 'Copied' : 'Copy address'}
                                </button>
                            </div>
                            <span className="sr-only" role="status">{copied ? 'Email address copied to clipboard' : ''}</span>
                        </div>
                    </li>

                    <li className="contact-card tone-yellow">
                        <Icon type="linkedin" size={100} />
                        <div>
                            <strong>LinkedIn</strong>
                            <a className="contact-value" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/ElionelVertus</a>
                            <div className="contact-actions">
                                <a className="btn-blue" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                                    Open profile <Icon type="external" size={100} /><span className="sr-only"> (opens in a new tab)</span>
                                </a>
                            </div>
                        </div>
                    </li>

                    <li className="contact-card tone-pink">
                        <Icon type="doc" size={100} />
                        <div>
                            <strong>Résumé</strong>
                            <span className="contact-value">PDF, one page</span>
                            <div className="contact-actions">
                                <a className="btn-blue" href={SITE.resume} target="_blank" rel="noopener noreferrer">
                                    Open résumé <Icon type="external" size={100} /><span className="sr-only"> (opens in a new tab)</span>
                                </a>
                                <a className="btn-ghost" href={SITE.resume} download="Elionel_Vertus_Resume.pdf">
                                    <Icon type="download" size={100} /> Download
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </main>
        </Shell>
    )
}