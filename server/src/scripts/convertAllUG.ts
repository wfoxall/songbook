import {ConvertFile} from '../utils/conversions'
import {readFile,readdir} from 'fs/promises';
import {Dirent} from 'fs';
import {resolve} from 'path';

const inDir = resolve(__dirname,'../../../songs/ultimateguitar');
const outDir = resolve(__dirname,'../../../songs/converted');

convertContents(inDir);

function convertContents(dir:string) {
    readdir(dir,{withFileTypes:true})
    .then(entries=>{
        entries.forEach(e=>{
            if(e.isFile() && e.name.endsWith('txt') && !e.name.endsWith('cp.txt')){
                ConvertFile(resolve(dir,e.name),{overwrite:true,outDir});
            }else if (e.isDirectory()){
                convertContents(resolve(dir,e.name));
            }
        })
    })
}