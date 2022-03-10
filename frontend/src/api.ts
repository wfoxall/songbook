import APISetList from './apisetlist';
import APISong from './apisong';

const devMode = process.env.NODE_ENV === 'development';

let apiroot = '';
if(devMode) {
    apiroot = `http://localhost:${process.env.PORT || 3000}`
}

export function getSongList(): Promise<APISong[]> {
    return fetch(`${apiroot}/songs`)
    .then(resp=>resp.json())
}
export function getSong(filename: string, transpose = 0): Promise<APISong> {
    return fetch(`${apiroot}/songs/${filename}?transpose=${transpose}`)
    .then(resp=>resp.json())
}

export function getSetlists(): Promise<APISetList[]> {
    return fetch(`${apiroot}/setlists`)
    .then(resp => resp.json())
}