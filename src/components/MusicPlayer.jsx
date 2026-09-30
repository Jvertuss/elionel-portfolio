import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '../data.js'
import Icon from './Icon.jsx'

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

// The music starts by itself at the visitor's first press or click (browsers don't allow sound any earlier),
// then keeps going through track changes and page changes. Remembers (for this browser tab only) that the visitor paused the music, so it never restarts against their wishes.
const OFF_KEY = 'ev-music-off'
const isMusicOff = () => {
    try { return window.sessionStorage.getItem(OFF_KEY) === '1' } catch { return false }
}
const setMusicOff = (off) => {
    try { off ? window.sessionStorage.setItem(OFF_KEY, '1') : window.sessionStorage.removeItem(OFF_KEY) } catch { /* private mode: fine */ }
}

// Keys that shouldn't count as "the visitor interacted" (focus movement, modifiers).
const NON_GESTURE_KEYS = new Set(['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock'])

export default function MusicPlayer({ home = false }) {
    const playlist = SITE.playlist
    const audioRef = useRef(null)
    const wantsPlayRef = useRef(false)
    const panelRef = useRef(null)
    const toggleRef = useRef(null)

    const [trackIndex, setTrackIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.2)
    const [muted, setMuted] = useState(false)
    const [open, setOpen] = useState(false)
    const [failed, setFailed] = useState(false)

    const track = playlist[trackIndex]

    const startPlayback = useCallback(() => {
        const audio = audioRef.current
        if (!audio) return
        wantsPlayRef.current = true
        const attempt = audio.play()
        if (attempt && attempt.catch) {
            attempt.catch(() => {
                wantsPlayRef.current = false
                setPlaying(false)
            })
        }
    }, [])

    const changeTrack = useCallback(
        (direction) => {
            setTrackIndex((i) => (i + direction + playlist.length) % playlist.length)
        },
        [playlist.length],
    )

    // Create the audio element once.
    useEffect(() => {
        const audio = new Audio()
        audio.preload = 'none'
        audio.volume = 0.2
        audioRef.current = audio

        const onTime = () => setCurrentTime(audio.currentTime)
        const onMeta = () => Number.isFinite(audio.duration) && setDuration(audio.duration)
        const onPlay = () => { setPlaying(true); setFailed(false) }
        const onPause = () => setPlaying(false)
        const onEnded = () => setTrackIndex((i) => (i + 1) % playlist.length)
        const onError = () => { setFailed(true); setPlaying(false) }

        audio.addEventListener('timeupdate', onTime)
        audio.addEventListener('loadedmetadata', onMeta)
        audio.addEventListener('durationchange', onMeta)
        audio.addEventListener('play', onPlay)
        audio.addEventListener('pause', onPause)
        audio.addEventListener('ended', onEnded)
        audio.addEventListener('error', onError)

        return () => {
            audio.pause()
            audio.removeAttribute('src')
            audio.load()
            audio.removeEventListener('timeupdate', onTime)
            audio.removeEventListener('loadedmetadata', onMeta)
            audio.removeEventListener('durationchange', onMeta)
            audio.removeEventListener('play', onPlay)
            audio.removeEventListener('pause', onPause)
            audio.removeEventListener('ended', onEnded)
            audio.removeEventListener('error', onError)
        }
    }, [playlist.length])

    // Music begins on its own at the visitor's first press, click, tap or key (browsers block sound before that).
    // On the title screen that first press is "press any button". Clicking the player itself is left alone,
    // and it never restarts if the visitor already paused it.
    useEffect(() => {
        let done = false
        const cleanup = () => {
            done = true
            window.removeEventListener('pointerdown', onFirst, true)
            window.removeEventListener('keydown', onFirst, true)
        }
        function onFirst(e) {
            if (done) return
            if (e.type === 'keydown' && (NON_GESTURE_KEYS.has(e.key) || e.ctrlKey || e.metaKey || e.altKey)) return
            if (e.target instanceof Element && e.target.closest('.music')) { cleanup(); return }
            cleanup()
            const audio = audioRef.current
            if (!audio || isMusicOff() || !audio.paused) return
            startPlayback()
        }
        window.addEventListener('pointerdown', onFirst, true)
        window.addEventListener('keydown', onFirst, true)
        return cleanup
    }, [startPlayback])

    // Load the selected track. Only start it if the visitor already pressed play.
    const firstLoad = useRef(true)
    useEffect(() => {
        const audio = audioRef.current
        if (!audio || !track) return
        setCurrentTime(0)
        setDuration(0)
        setFailed(false)
        if (firstLoad.current) {
            firstLoad.current = false
            audio.src = track.src
            return
        }
        audio.src = track.src
        if (wantsPlayRef.current) startPlayback()
    }, [trackIndex, track, startPlayback])

    // Close the panel with Escape or a click outside it.
    useEffect(() => {
        if (!open) return undefined
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                setOpen(false)
                toggleRef.current?.focus()
            }
        }
        const onDown = (e) => {
            const root = panelRef.current?.parentElement
            if (root && !root.contains(e.target)) setOpen(false)
        }
        document.addEventListener('keydown', onKey)
        document.addEventListener('pointerdown', onDown)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.removeEventListener('pointerdown', onDown)
        }
    }, [open])

    const togglePlayback = () => {
        const audio = audioRef.current
        if (!audio) return
        if (audio.paused) {
            setMusicOff(false)
            startPlayback()
        } else {
            setMusicOff(true)
            wantsPlayRef.current = false
            audio.pause()
        }
    }

    const seek = (e) => {
        const audio = audioRef.current
        const next = Number(e.target.value)
        if (audio) audio.currentTime = next
        setCurrentTime(next)
    }

    const changeVolume = (e) => {
        const audio = audioRef.current
        const next = Number(e.target.value)
        if (audio) {
            audio.volume = next
            audio.muted = false
        }
        setVolume(next)
        setMuted(false)
    }

    const toggleMute = () => {
        const audio = audioRef.current
        const next = !muted
        if (audio) audio.muted = next
        setMuted(next)
    }

    if (!track) return null

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
        <section
            className={`music ${home ? 'music-home' : ''} ${open ? 'is-open' : ''} ${playing ? 'is-playing' : ''}`}
            aria-label="Music player"
        >
            {open && (
                <div className="music-panel" ref={panelRef} id="music-panel">
                    <div className="music-panel-head">
                        <span>Sound Test</span>
                        <button type="button" className="music-icon-btn" onClick={() => setOpen(false)} aria-label="Close music panel">
                            <Icon type="close" size={16} />
                        </button>
                    </div>

                    <div className="music-progress-row">
                        <span className="music-time">{formatTime(currentTime)}</span>
                        <input
                            className="music-range music-seek"
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={Math.min(currentTime, duration || 0)}
                            onChange={seek}
                            style={{ '--fill': `${progress}%` }}
                            aria-label="Song progress"
                            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                            disabled={!duration}
                        />
                        <span className="music-time">{formatTime(duration)}</span>
                    </div>

                    <div className="music-volume-row">
                        <button type="button" className="music-icon-btn" onClick={toggleMute} aria-label={muted ? 'Unmute music' : 'Mute music'} aria-pressed={muted}>
                            <Icon type={muted || volume === 0 ? 'mute' : 'volume'} size={18} />
                        </button>
                        <input
                            className="music-range"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={changeVolume}
                            style={{ '--fill': `${volume * 100}%` }}
                            aria-label="Music volume"
                        />
                    </div>

                    {failed && <p className="music-error" role="status">This track could not be loaded.</p>}

                    <ol className="music-list">
                        {playlist.map((item, i) => (
                            <li key={item.src}>
                                <button
                                    type="button"
                                    className={i === trackIndex ? 'is-current' : ''}
                                    aria-current={i === trackIndex ? 'true' : undefined}
                                    onClick={() => {
                                        if (i === trackIndex) return togglePlayback()
                                        setMusicOff(false)
                                        wantsPlayRef.current = true
                                        setTrackIndex(i)
                                        return undefined
                                    }}
                                >
                                    <span className="music-list-num">{i + 1}</span>
                                    <span className="music-list-title">{item.title}</span>
                                    <span className="music-list-artist">{item.artist}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className="music-pill">
                <button
                    type="button"
                    ref={toggleRef}
                    className="music-cover-btn"
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    aria-controls="music-panel"
                    aria-label={open ? 'Hide music controls' : 'Show music controls'}
                >
                    <img src={track.cover} alt="" />
                    <span className="music-eq" aria-hidden="true"><i /><i /><i /></span>
                </button>

                <div className="music-meta" aria-live="off">
                    <strong>{track.title}</strong>
                    <span>{track.artist}</span>
                </div>

                <div className="music-controls">
                    <button type="button" className="music-icon-btn" onClick={() => changeTrack(-1)} aria-label="Previous song">
                        <Icon type="prev" size={16} />
                    </button>
                    <button type="button" className="music-icon-btn music-play" onClick={togglePlayback} aria-label={playing ? 'Pause music' : 'Play music'}>
                        <Icon type={playing ? 'pause' : 'play'} size={18} />
                    </button>
                    <button type="button" className="music-icon-btn" onClick={() => changeTrack(1)} aria-label="Next song">
                        <Icon type="next" size={16} />
                    </button>
                </div>
            </div>
        </section>
    )
}