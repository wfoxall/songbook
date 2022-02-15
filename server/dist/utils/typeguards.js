"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChordLyricsPair = exports.isTag = void 0;
function isTag(obj) {
    if (typeof obj.originalName !== "string")
        return false;
    if (typeof obj.name !== "string")
        return false;
    // if(typeof obj.isRenderable !== "function") return false;
    return true;
}
exports.isTag = isTag;
function isChordLyricsPair(obj) {
    if (typeof obj.chords !== "string")
        return false;
    if (typeof obj.lyrics !== "string")
        return false;
    // if(typeof obj.isRenderable !== "function") return false;
    return true;
}
exports.isChordLyricsPair = isChordLyricsPair;
