import { ChordLyricsPair, Tag } from "chordsheetjs"

export function isTag(obj: any): obj is Tag {
    if(typeof obj.originalName !== "string") return false;
    if(typeof obj.name !== "string") return false;
    // if(typeof obj.isRenderable !== "function") return false;
    return true;
}
export function isChordLyricsPair(obj: any): obj is ChordLyricsPair {
    if(typeof obj.chords !== "string") return false;
    if(typeof obj.lyrics !== "string") return false;
    // if(typeof obj.isRenderable !== "function") return false;
    return true;
}