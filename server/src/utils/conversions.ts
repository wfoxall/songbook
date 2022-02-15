import {UltimateGuitarParser,ChordProParser,TextFormatter,Song,ChordProFormatter, ChordLyricsPair, Chord, Key, Note} from 'chordsheetjs';
import {parse,format} from 'path';
import {existsSync,Dirent,readFileSync,constants} from 'fs';
import {readFile,writeFile} from 'fs/promises';
import { isChordLyricsPair } from './typeguards';

export async function ConvertFile(filename: string, options: {transpose?: number, outDir?: string, overwrite?: boolean} = {}): Promise<void>{
    const parsed = parse(filename);
    const contents = await readFile(filename,{encoding:"utf8"});
    let song: Song;
    if(parsed.name.endsWith('ug')){ song = new UltimateGuitarParser({preserveWhitespace:false}).parse(contents)}
    else if(parsed.name.endsWith('cp')){ song = new ChordProParser().parse(contents)}
    else{
        // console.log(`Assuming ${parsed.name} already in chordsheet format.`)
        return;
    }

    console.log(`Running ${parsed.name} through transposer`)
    if(options.transpose){
        song.lines.forEach(l=>{
            // console.log(`Line with ${l.items.length} items.`)
            l.items.forEach(i=>{
                if(isChordLyricsPair(i)){
                    // console.log(`Transposing ${i}`);
                    let chord = Chord.parse(i.chords);
                    if(chord && options.transpose) i.chords = chord.transpose(options.transpose).toString();
                }else{
                    // console.log(`${i} is not a chord?`)
                }
            })
        })
    }

    let outputDirectory = parsed.dir;
    if(options.outDir && existsSync(options.outDir)){
        outputDirectory = options.outDir;
        console.log(`Output directory is: ${outputDirectory}`)
    }else{
        console.warn(`Output directory (${options.outDir}) not specified or does not exist.`)
    }

    const cpformatted = new ChordProFormatter().format(song);
    const outfilename = format({dir:outputDirectory,name:parsed.name.slice(0,-2)+'cp',ext:'.txt'});
    // if(existsSync(outfilename)) throw `${outfilename} already exists!`

    let flag = !!options.overwrite ? 'w' : 'wx';

    console.log(`Writing file to: ${outfilename}`);

    return writeFile(outfilename,cpformatted,{encoding:'utf8',flag});
}