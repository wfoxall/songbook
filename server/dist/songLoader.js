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
        else {
            throw "Unsupported format.";
        }
    }
    toString() {
        if (this.song) {
            const formatter = new chordsheetjs_1.TextFormatter();
            // const formatter = new HtmlDivFormatter();
            // const formatter = new HtmlTableFormatter();
            // const formatter = new ChordProFormatter();
            return formatter.format(this.song);
        }
        else {
            throw "Song is currently empty.";
        }
    }
}
exports.default = Song;
