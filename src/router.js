import { useEffect, useState } from 'react'

// Hash routes: #/, #/projects, #/projects/shrike, #/experience/dominos, #/about, #/contact, #/full
const parse = () => {
  const [name = 'home', id = null] = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  return { name: name || 'home', id }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onHash = () => setRoute(parse())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export const navigate = (hash) => {
  window.location.hash = hash.replace(/^#/, '')
}
