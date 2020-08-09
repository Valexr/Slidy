import { readable, derived } from 'svelte/store'

const setupMq = (queryString) => (set) => {
    const query = window.matchMedia(queryString)
    const callback = (e) => set(e.matches)
    query.addListener(callback)
    callback(query)
    return () => query.removeListener(callback)
}

const defaultQueries = {
    desktop: 'screen and (min-width: 769px)',
    mobile: 'screen and (max-width: 768px)'
}

let queryStores
export let media

export const setup = (queries = defaultQueries) => {
    queryStores = Object.entries(queries).reduce((acc, [mediaName, queryString]) => (acc[mediaName] = readable(false, setupMq(queryString)), acc), {})
    media = derived(Object.values(queryStores), ($queryStores) => $queryStores.reduce((acc, q, i) => (acc[Object.keys(queryStores)[i]] = q, acc), {}))
}
