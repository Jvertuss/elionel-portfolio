import { useEffect, useState } from 'react'

// "Mobile" = a phone-sized window, or a touch screen up to tablet size.
// Add ?ui=mobile or ?ui=desktop to the address to preview either layout on any device,
// for example:  http://localhost:5173/?ui=mobile
const QUERY = '(max-width: 820px), (pointer: coarse) and (max-width: 1100px)'

const forcedUi = () => {
    try {
        const value = new URLSearchParams(window.location.search).get('ui')
        return value === 'mobile' || value === 'desktop' ? value : null
    } catch {
        return null
    }
}

const detect = () => {
    const forced = forcedUi()
    if (forced) return forced === 'mobile'
    return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(QUERY).matches
}

const apply = (mobile) => {
    document.documentElement.dataset.ui = mobile ? 'mobile' : 'desktop'
}

// Set the layout flag as early as possible so there's no flash of the wrong design.
if (typeof document !== 'undefined') apply(detect())

export function useIsMobile() {
    const [mobile, setMobile] = useState(detect)

    useEffect(() => {
        if (forcedUi() || !window.matchMedia) return undefined
        const mq = window.matchMedia(QUERY)
        const onChange = () => {
            const next = mq.matches
            apply(next)
            setMobile(next)
        }
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    return mobile
}