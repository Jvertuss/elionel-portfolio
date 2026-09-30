import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '../data.js'
import './title.css'

// Keys that should NOT count as "any button" (browser shortcuts, focus movement, modifiers).
const IGNORED_KEYS = new Set(['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'ContextMenu', 'PrintScreen'])

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// "Press any button" title screen. Shows once per browser session, only when the site is opened at the home address.
export default function Title({ onDone }) {
    const buttonRef = useRef(null)
    const [leaving, setLeaving] = useState(false)
    const doneRef = useRef(false)

    const start = useCallback(() => {
        if (doneRef.current) return
        doneRef.current = true
        if (prefersReducedMotion()) {
            onDone()
            return
        }
        setLeaving(true)
        setTimeout(onDone, 380)
    }, [onDone])

    useEffect(() => {
        buttonRef.current?.focus()
        const onKey = (e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return
            if (IGNORED_KEYS.has(e.key) || /^F\d{1,2}$/.test(e.key)) return
            e.preventDefault()
            start()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [start])

    return (
        <div className={`title-screen ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-label={`${SITE.fullName} portfolio — title screen`}>
            <div className="title-top" aria-hidden="true" />
            <span className="title-ver" aria-hidden="true">Ver. 1.0.0</span>

            <div className="title-logo" aria-hidden="true">
                <span className="t-line t-1">ELIONEL</span>
                <span className="t-line t-2">VERTUS</span>
                <svg className="t-swoosh" viewBox="0 0 840 60" preserveAspectRatio="none">
                    <path d="M0 54C190 6 650 6 840 54C650 24 190 24 0 54Z" fill="currentColor" />
                </svg>
                <span className="t-line t-3">PORTFOLIO</span>
            </div>

            <div className="title-bar" aria-hidden="true">
                <span className="press press-pointer">PRESS ANY BUTTON</span>
                <span className="press press-touch">TAP TO START</span>
            </div>

            <div className="title-credits" aria-hidden="true">
                <p>© 2026 {SITE.fullName}. All rights reserved.</p>
                <p>{SITE.major} • {SITE.university} • Expected Spring 2027</p>
                <p>Embedded systems • Firmware • Hardware bring-up • Sensor fusion research • Project SHRIKE</p>
                <p>Game music and references belong to their owners. Unofficial fan-style tribute, not affiliated with Nintendo.</p>
            </div>

            {/* One real button covers the screen so click, tap, Enter and Space all work, and screen readers can find it. */}
            <button type="button" ref={buttonRef} className="title-hit" onClick={start}>
                <span className="sr-only">Press any button to enter the portfolio</span>
            </button>
        </div>
    )
}