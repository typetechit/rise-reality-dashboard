import {atom} from "jotai";

const animeAtom = atom([
    {
        title: 'Ghost in the Shell',
        year: 1995,
        watched: true
    },
    {
        title: 'Serial Experiments Lain',
        year: 1998,
        watched: false
    }
])
const sidebarOpenState = atom(false)
const authUser = atom<any>(null)

export {
    animeAtom,
    sidebarOpenState,
    authUser
}
