import {
    Song as csSong,
    ChordSheetParser,
    ChordProParser,
    TextFormatter,
    HtmlDivFormatter,
    UltimateGuitarParser
} from 'chordsheetjs';
import { isChordLyricsPair } from './utils/typeguards';

export default class Song {
    song: csSong | undefined;
    constructor(text: string, type: "chordsheet"|"ultimateguitar"|"chordpro" = "chordsheet") {
        if(type === "chordsheet") {
            const parser = new ChordSheetParser({preserveWhitespace:true});
            this.song = parser.parse(text);
        }else if (type === "chordpro") {
            const parser = new ChordProParser();
            this.song = parser.parse(text);
        }else if (type === "ultimateguitar") {
            const parser = new UltimateGuitarParser({preserveWhitespace:true});
            this.song = parser.parse(text);
        }else {
            throw "Unsupported format."
        }
    }

    toString(): string {
        if(this.song){
            const formatter = new TextFormatter();
            return formatter.format(this.song) 
        }else{
            throw "Song is currently empty."
        }
    }
    toHTML(): string {
        if(this.song){
            const formatter = new HtmlDivFormatter();
            const html = formatter.format(this.song);
            return html;
        }else{
            throw "Song is currently empty."
        }
    }
    get Title(): string {
        // @ts-ignore
        return this.song?.getMetaData('title') || "Untitled"
    }
    get Artist(): string {
        return this.song?.getMetaData('artist') || "Unknown Artist"
    }
}