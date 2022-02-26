import Express from 'express';
import {readdirSync,readdir,readFile} from 'fs';
import {resolve} from 'path';
import Song from './song';
import cors from 'cors';

const app = Express();
const port = process.env.PORT || 3001;

const songsdir = resolve(__dirname,'../../songs');
console.log(`${readdirSync(songsdir).length} songs found in directory.`);

app.use(Express.static(resolve(__dirname,'../../frontend/dist')));

app.use(cors({
    origin: ['http://localhost:8080','http://localhost:8081']
}))

app.get('/songs',(req,res)=>{
    const dirents = readdirSync(songsdir,{withFileTypes: true});
    const songs = dirents
    .filter((dirent)=>dirent.isFile() && dirent.name.endsWith('cp.txt'))
    .map(dirent=>{
        let song = parseFilename(dirent.name);
        return {...song,filename:dirent.name};
    })
    res.json(songs.sort((s1,s2)=>{
        if(s1.title && s2.title){
            return s1.title > s2.title ? 1: -1;
        }else{
            return 0
        }
    }));
})

app.get('/songs/:name',(req,res)=>{
    const songname = req.params.name;
    const path = resolve(songsdir,songname);
    // console.log(`Request for... ${path}`)
    readFile(path,{encoding:'utf8'},(err,data)=>{
        if(err) res.status(500).send(err);
        else {
            try {
                const song = new Song(data,"chordpro");
                res.json({html:song.toHTML(),title:song.Title, artist: song.Artist, filename: songname});
            } catch (error) {
                console.error(error)
                res.status(500).send(error);
            }
        }
    })
});

function parseFilename(filename: string) {
    const regex = /^(?<artist>\w+).(?<title>\w+).(?<type>ug|cp)(?:.txt)*$/;
    if(!regex.test(filename)) return null;
    const result = regex.exec(filename);
    if(!result || !result.groups) return null
    let {artist,title,type} = result.groups;
    return {
        artist,title,type
    }
}

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})