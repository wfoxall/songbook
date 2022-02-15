"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversions_1 = require("../utils/conversions");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const songsdir = (0, path_1.resolve)(__dirname, '../../../songs');
convertContents(songsdir);
function convertContents(dir) {
    (0, promises_1.readdir)(dir, { withFileTypes: true })
        .then(entries => {
        entries.forEach(e => {
            if (e.isFile() && e.name.endsWith('txt') && !e.name.endsWith('cp.txt')) {
                (0, conversions_1.ConvertFile)((0, path_1.resolve)(dir, e.name));
            }
            else if (e.isDirectory()) {
                convertContents((0, path_1.resolve)(dir, e.name));
            }
        });
    });
}
