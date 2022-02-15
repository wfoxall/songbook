"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = require("fs");
const path_1 = require("path");
const conversions_1 = require("../utils/conversions");
let outDir = (0, path_1.resolve)(__dirname, '../../../', './songs/converted');
const argv = (0, yargs_1.default)(process.argv.slice(2)).options({
    f: { type: 'string', demandOption: true, alias: 'file' },
    t: { type: 'number', demandOption: true, alias: 'transpose' },
    o: { type: 'string', alias: 'outdir' },
}).parseSync();
if (argv.f && argv.t)
    console.log(`Transposing ${argv.f} by ${argv.t}`);
if (!argv.t) {
    console.error("Must specify a positive or negative transpose number");
    process.exit();
}
const isFullPath = (0, fs_1.existsSync)(argv.f);
if (!isFullPath) {
    console.error('Filepath must be full filepath.');
}
if (argv.o) {
    if (!(0, fs_1.existsSync)(argv.o)) {
        console.warn(`Specified outdir was invalid. Using default. ${outDir}`);
    }
    else {
        outDir = argv.o;
    }
}
(0, conversions_1.ConvertFile)(argv.f, { outDir, transpose: argv.t });
