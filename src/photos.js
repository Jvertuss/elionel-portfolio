import { asset } from './data.js'

const img = (file) => asset(`images/${file}`)

// Photos live in public/images/. To swap one, replace the file (same name) or change the name here.

export const HERO = {
    src: img('hero-waterfall.webp'),
    alt: 'Elionel smiling in a sun hat, sitting in front of a mossy stone waterfall wall',
}

export const AVATAR = {
    src: img('avatar.webp'),
    alt: 'Portrait of Elionel Vertus',
}

// Photo gallery on the About screen. `pos` is the focal point used when a photo is cropped.
export const GALLERY = [
    {
        id: 'pond-cleanup',
        src: img('pond-cleanup.webp'),
        alt: 'A large group of students holding trash grabbers and bags in front of an Adopt-A-Pond sign',
        caption: 'LEAD Scholars pond cleanup',
        tag: 'Community',
        tone: 'green',
        pos: '50% 60%',
        wide: true,
    },
    {
        id: 'waterfall',
        src: img('hero-waterfall.webp'),
        alt: 'Elionel in a sun hat sitting in front of a stone waterfall wall',
        caption: 'Adventure day',
        tag: 'Explore',
        tone: 'blue',
        pos: '50% 45%',
    },
    {
        id: 'stairs',
        src: img('stairs.webp'),
        alt: 'Elionel sitting halfway up a very long stone staircase, resting his head in his hand',
        caption: 'Rest stop on a very long staircase',
        tag: 'Explore',
        tone: 'orange',
        pos: '50% 50%',
    },
    {
        id: 'ref',
        src: img('ref-basketball.webp'),
        alt: 'Elionel in a referee jersey holding a basketball on an outdoor court',
        caption: 'Game day, ref mode',
        tag: 'Sports',
        tone: 'red',
        pos: '50% 35%',
    },
    {
        id: 'event',
        src: img('event-setup.webp'),
        alt: 'A group giving thumbs up behind long tables of catered food trays at an event',
        caption: 'Event day setup',
        tag: 'Events',
        tone: 'pink',
        pos: '50% 40%',
    },
    {
        id: 'piano',
        src: img('piano.webp'),
        alt: 'Elionel in a suit sitting behind a white grand piano',
        caption: 'At the piano',
        tag: 'Music',
        tone: 'purple',
        pos: '50% 38%',
    },
    {
        id: 'team',
        src: img('team-photo.webp'),
        alt: 'A large team in matching blue shirts posing together on a gym floor',
        caption: 'Team photo',
        tag: 'Team',
        tone: 'blue',
        pos: '50% 45%',
    },
    {
        id: 'pond',
        src: img('pond-reflection.webp'),
        alt: 'Clouds and trees reflected in a calm pond',
        caption: 'Sky on the water',
        tag: 'Scenery',
        tone: 'teal',
        pos: '50% 40%',
    },
]

// Extra art on the home menu (baked duotone images sized for the panels).
export const PANEL_ART = {}

// Photos shown inside the center orb when a section is selected.
export const ORB_PHOTOS = {}

// Side-quest cards on the About screen, keyed by card title.
export const QUEST_PHOTOS = {
    'LEAD Scholars Academy': {
        src: img('pond-cleanup.webp'),
        alt: 'LEAD Scholars volunteers at an Adopt-A-Pond cleanup',
        pos: '50% 60%',
    },
}

// Experience cards, keyed by experience id.
export const EXPERIENCE_PHOTOS = {
    'lead-director': {
        src: img('pond-cleanup.webp'),
        alt: 'LEAD Scholars volunteers holding trash grabbers at an Adopt-A-Pond cleanup',
        caption: 'LEAD Scholars community service day',
        pos: '50% 60%',
    },
}