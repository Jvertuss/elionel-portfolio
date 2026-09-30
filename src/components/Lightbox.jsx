import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// Full-screen photo viewer: Esc closes, arrow keys / buttons move, focus stays inside.
export default function Lightbox({ items, index, onClose, onChange }) {
    const dialogRef = useRef(null)
    const closeRef = useRef(null)
    const item = items[index]

    // Focus the close button on open, give focus back to the thumbnail on close, freeze page scroll.
    useEffect(() => {
        const opener = document.activeElement
        closeRef.current?.focus()
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = previous
            if (opener && opener.focus) opener.focus()
        }
    }, [])

    useEffect(() => {
        const stop = (e) => { e.preventDefault(); e.stopImmediatePropagation() }
        const onKey = (e) => {
            if (e.key === 'Escape') { stop(e); onClose() }
            else if (e.key === 'ArrowRight') { stop(e); onChange((index + 1) % items.length) }
            else if (e.key === 'ArrowLeft') { stop(e); onChange((index - 1 + items.length) % items.length) }
            else if (e.key === 'Tab' && dialogRef.current) {
                const buttons = [...dialogRef.current.querySelectorAll('button')]
                if (!buttons.length) return
                const first = buttons[0]
                const last = buttons[buttons.length - 1]
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
            }
        }
        // capture phase so Esc closes the viewer instead of also leaving the page
        window.addEventListener('keydown', onKey, true)
        return () => window.removeEventListener('keydown', onKey, true)
    }, [index, items.length, onClose, onChange])

    if (!item) return null

    return (
        <div
            className={`lightbox tone-${item.tone || 'blue'}`}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <button type="button" ref={closeRef} className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close photo viewer">
                <Icon type="close" size={100} />
            </button>
            <button type="button" className="lightbox-btn lightbox-prev" onClick={() => onChange((index - 1 + items.length) % items.length)} aria-label="Previous photo">
                <Icon type="back" size={100} />
            </button>
            <figure>
                <img src={item.src} alt={item.alt} />
                <figcaption>
                    <strong>{item.caption}</strong>
                    <span>{index + 1} / {items.length}</span>
                </figcaption>
            </figure>
            <button type="button" className="lightbox-btn lightbox-next" onClick={() => onChange((index + 1) % items.length)} aria-label="Next photo">
                <Icon type="forward" size={100} />
            </button>
        </div>
    )
}