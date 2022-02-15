"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertFile = void 0;
const chordsheetjs_1 = require("chordsheetjs");
const path_1 = require("path");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const typeguards_1 = require("./typeguards");
function ConvertFile(filename, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsed = (0, path_1.parse)(filename);
        const contents = yield (0, promises_1.readFile)(filename, { encoding: "utf8" });
        let song;
        if (parsed.name.endsWith('ug')) {
            song = new chordsheetjs_1.UltimateGuitarParser({ preserveWhitespace: false }).parse(contents);
        }
        else if (parsed.name.endsWith('cp')) {
            song = new chordsheetjs_1.ChordProParser().parse(contents);
        }
        else {
            // console.log(`Assuming ${parsed.name} already in chordsheet format.`)
            return;
        }
        console.log(`Running ${parsed.name} through transposer`);
        if (options.transpose) {
            song.lines.forEach(l => {
                // console.log(`Line with ${l.items.length} items.`)
                l.items.forEach(i => {
                    if ((0, typeguards_1.isChordLyricsPair)(i)) {
                        // console.log(`Transposing ${i}`);
                        let chord = chordsheetjs_1.Chord.parse(i.chords);
                        if (chord && options.transpose)
                            i.chords = chord.transpose(options.transpose).toString();
                    }
                    else {
                        // console.log(`${i} is not a chord?`)
                    }
                });
            });
        }
        let outputDirectory = parsed.dir;
        if (options.outDir && (0, fs_1.existsSync)(options.outDir)) {
            outputDirectory = options.outDir;
            console.log(`Output directory is: ${outputDirectory}`);
        }
        else {
            console.warn(`Output directory (${options.outDir}) not specified or does not exist.`);
        }
        const cpformatted = new chordsheetjs_1.ChordProFormatter().format(song);
        const outfilename = (0, path_1.format)({ dir: outputDirectory, name: parsed.name.slice(0, -2) + 'cp', ext: '.txt' });
        // if(existsSync(outfilename)) throw `${outfilename} already exists!`
        let flag = !!options.overwrite ? 'w' : 'wx';
        console.log(`Writing file to: ${outfilename}`);
        return (0, promises_1.writeFile)(outfilename, cpformatted, { encoding: 'utf8', flag });
    });
}
exports.ConvertFile = ConvertFile;
