"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = require("path");
const song_1 = __importDefault(require("./song"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const songsdir = (0, path_1.resolve)(__dirname, '../../songs');
console.log(`${(0, fs_1.readdirSync)(songsdir).length} songs found in directory.`);
app.use((0, cors_1.default)({
    origin: ['http://localhost:8080', 'http://localhost:8081']
}));
app.get('/songs', (req, res) => {
    const dirents = (0, fs_1.readdirSync)(songsdir, { withFileTypes: true });
    const songs = dirents
        .filter((dirent) => dirent.isFile() && dirent.name.endsWith('cp.txt'))
        .map(dirent => {
        let song = parseFilename(dirent.name);
        return Object.assign(Object.assign({}, song), { filename: dirent.name });
    });
    res.json(songs.sort((s1, s2) => {
        if (s1.title && s2.title) {
            return s1.title > s2.title ? 1 : -1;
        }
        else {
            return 0;
        }
    }));
});
app.get('/songs/:name', (req, res) => {
    const songname = req.params.name;
    const path = (0, path_1.resolve)(songsdir, songname);
    // console.log(`Request for... ${path}`)
    (0, fs_1.readFile)(path, { encoding: 'utf8' }, (err, data) => {
        if (err)
            res.status(500).send(err);
        else {
            try {
                const song = new song_1.default(data, "chordpro");
                res.json({ html: song.toHTML(), title: song.Title, artist: song.Artist, filename: songname });
            }
            catch (error) {
                console.error(error);
                res.status(500).send(error);
            }
        }
    });
});
function parseFilename(filename) {
    const regex = /^(?<artist>\w+).(?<title>\w+).(?<type>ug|cp)(?:.txt)*$/;
    if (!regex.test(filename))
        return null;
    const result = regex.exec(filename);
    if (!result || !result.groups)
        return null;
    let { artist, title, type } = result.groups;
    return {
        artist, title, type
    };
}
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
