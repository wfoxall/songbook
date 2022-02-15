import yargs from 'yargs';
import {readFileSync,existsSync} from 'fs';
import {resolve} from 'path'
import { ConvertFile } from '../utils/conversions';

let outDir = resolve(__dirname,'../../../','./songs/converted');


const argv = yargs(process.argv.slice(2)).options({
    f: { type: 'string', demandOption: true, alias: 'file' },
    t: { type: 'number', demandOption: true, alias: 'transpose' },
    o: { type: 'string', alias: 'outdir' },
  }).parseSync();

if(argv.f && argv.t)
console.log(`Transposing ${argv.f} by ${argv.t}`);

if(!argv.t){
    console.error("Must specify a positive or negative transpose number");
    process.exit();
}

const isFullPath = existsSync(argv.f);
if(!isFullPath) {
    console.error('Filepath must be full filepath.')
}

if(argv.o){
    if(!existsSync(argv.o)){
        console.warn(`Specified outdir was invalid. Using default. ${outDir}`)
    }else{
        outDir = argv.o;
    }
}

ConvertFile(argv.f,{outDir,transpose:argv.t})