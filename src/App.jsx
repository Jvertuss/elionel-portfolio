import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoute, navigate } from './router.js'
import { EXPERIENCES } from './data.js'
import { PROJECTS } from './projects.js'
import { useIsMobile } from './useIsMobile.js'
import './mobile.css'
import MusicPlayer from './components/MusicPlayer.jsx'
import Home from './pages/Home.jsx'
import MobileHome from './pages/MobileHome.jsx'
import Title from './pages/Title.jsx'
import ProjectsPage, { ProjectDetail } from './pages/Projects.jsx'
import ExperiencePage, { ExperienceDetail } from './pages/Experience.jsx'
import AboutPage from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'
import FullPortfolio from './pages/Full.jsx'

// The title screen shows once per browser session, and only when the site is opened at its home address
// (so a shared link like /#/about goes straight to that page).
const TITLE_KEY = 'ev-title-seen'
const shouldShowTitle = () => {
    try {
        if (window.location.hash.replace(/^#\/?/, '') !== '') return false
        return window.sessionStorage.getItem(TITLE_KEY) !== '1'
    } catch {
        return window.location.hash.replace(/^#\/?/, '') === ''
    }
}

const BASE_TITLE = 'Elionel Vertus'
const HOME_TITLE = 'Elionel Vertus | Electrical & Embedded Systems Engineering Portfolio'

function titleFor(route) {
    const project = PROJECTS.find((p) => p.id === route.id)
    const experience = EXPERIENCES.find((e) => e.id === route.id)
    switch (route.name) {
        case 'projects': return project ? `${project.title} | Projects | ${BASE_TITLE}` : `Projects | ${BASE_TITLE}`
        case 'experience': return experience ? `${experience.title} | Experience | ${BASE_TITLE}` : `Experience | ${BASE_TITLE}`
        case 'about': return `About | ${BASE_TITLE}`
        case 'contact': return `Contact | ${BASE_TITLE}`
        case 'full': return `Full Portfolio | ${BASE_TITLE}`
        default: return HOME_TITLE
    }
}

// Where "Back" (and the Escape key) goes from each screen.
function backTarget(route) {
    if ((route.name === 'projects' || route.name === 'experience') && route.id) return `#/${route.name}`
    if (route.name === 'home') return null
    return '#/'
}

export default function App() {
    const route = useRoute()
    const isMobile = useIsMobile()
    const mainRef = useRef(null)
    const musicRef = useRef(null)
    const firstRender = useRef(true)
    const [titleOpen, setTitleOpen] = useState(shouldShowTitle)

    const finishTitle = useCallback(() => {
        try { window.sessionStorage.setItem(TITLE_KEY, '1') } catch { /* private mode: fine */ }
        setTitleOpen(false)
        setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 0)
    }, [])

    // Leaving the home address (typing another link, back button) closes the title screen.
    useEffect(() => {
        if (titleOpen && route.name !== 'home') finishTitle()
    }, [route.name, titleOpen, finishTitle])

    // While the title screen is up, the page behind it can't be tabbed into or read by screen readers.
    useEffect(() => {
        mainRef.current?.toggleAttribute('inert', titleOpen)
        musicRef.current?.toggleAttribute('inert', titleOpen)
    }, [titleOpen])

    useEffect(() => {
        document.title = titleFor(route)
        window.scrollTo(0, 0)
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        // Move focus to the new screen so keyboard and screen-reader users start at the top.
        mainRef.current?.focus({ preventScroll: true })
    }, [route.name, route.id]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const onKey = (e) => {
            if (e.key !== 'Escape' || e.defaultPrevented) return
            if (e.target instanceof HTMLElement && e.target.closest('input, select, textarea')) return
            const target = backTarget(route)
            if (target) navigate(target)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [route])

    const project = PROJECTS.find((p) => p.id === route.id)
    const experience = EXPERIENCES.find((e) => e.id === route.id)

    let page
    switch (route.name) {
        case 'projects':
            page = route.id && project ? <ProjectDetail project={project} /> : <ProjectsPage />
            break
        case 'experience':
            page = route.id && experience ? <ExperienceDetail item={experience} /> : <ExperiencePage />
            break
        case 'about': page = <AboutPage />; break
        case 'contact': page = <ContactPage />; break
        case 'full': page = <FullPortfolio />; break
        default: page = isMobile ? <MobileHome /> : <Home />
    }

    const isHome = route.name === 'home'
    const backHref = backTarget(route)

    return (
        <>
            <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus() }}>
                Skip to content
            </a>
            <div id="main" ref={mainRef} tabIndex={-1} className="screen-root" key={`${route.name}/${route.id || ''}`} data-screen={route.name}>
                {page}
            </div>
            {isMobile && backHref && !titleOpen && (
                <a className="mk-back" href={backHref} aria-label="Back">
                    <svg viewBox="0 0 64 64" width="100" height="100" aria-hidden="true"><path d="M52 32H14M28 16 12 32l16 16" /></svg>
                    <span>BACK</span>
                </a>
            )}
            <div ref={musicRef}><MusicPlayer home={isHome && !isMobile} /></div>
            {titleOpen && <Title onDone={finishTitle} />}
        </>
    )
}