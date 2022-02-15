"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chordsheetjs_1 = require("chordsheetjs");
class Song {
    constructor(text, type = "chordsheet") {
        if (type === "chordsheet") {
            const parser = new chordsheetjs_1.ChordSheetParser({ preserveWhitespace: true });
            this.song = parser.parse(text);
        }
        else if (type === "chordpro") {
            const parser = new chordsheetjs_1.ChordProParser();
            this.song = parser.parse(text);
        }
        else if (type === "ultimateguitar") {
            const parser = new chordsheetjs_1.UltimateGuitarParser({ preserveWhitespace: true });
            this.song = parser.parse(text);
        }
        else {
            throw "Unsupported format.";
        }
    }
    toString() {
        if (this.song) {
            const formatter = new chordsheetjs_1.TextFormatter();
            return formatter.format(this.song);
        }
        else {
            throw "Song is currently empty.";
        }
    }
    toHTML() {
        if (this.song) {
            const formatter = new chordsheetjs_1.HtmlDivFormatter();
            const html = formatter.format(this.song);
            return html;
        }
        else {
            throw "Song is currently empty.";
        }
    }
    get Title() {
        var _a;
        // @ts-ignore
        return ((_a = this.song) === null || _a === void 0 ? void 0 : _a.getMetaData('title')) || "Untitled";
    }
    get Artist() {
        var _a;
        return ((_a = this.song) === null || _a === void 0 ? void 0 : _a.getMetaData('artist')) || "Unknown Artist";
    }
}
exports.default = Song;
