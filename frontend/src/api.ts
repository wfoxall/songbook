import APISong from './apisong';

const devMode = process.env.NODE_ENV === 'development';

let apiroot = '/';
if(devMode) {
    apiroot = `http://localhost:${process.env.PORT || 3000}/`
}

export function getSongList(): Promise<APISong[]> {
    return fetch(`${apiroot}songs`)
    .then(resp=>resp.json())
}
export function getSong(filename: string): Promise<APISong> {
    return fetch(`${apiroot}songs/${filename}`)
    .then(resp=>resp.json())
}