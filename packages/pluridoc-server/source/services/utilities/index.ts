import fs from 'fs';
import crypto from 'crypto';

import portscanner from 'portscanner';
import archiver from 'archiver';

import {
    PluridocPlane,
    pluridocDataToPluridocString,
} from '@plurid/pluridoc-parser';

import {
    PLURIDOC_EXTENSION,
} from '../../data/constants';



export const checkAvailablePort = (port: number): Promise<number> => {
    const LOCALHOST = '127.0.0.1';
    return new Promise((resolve, reject) => {
        portscanner.findAPortNotInUse(port, port + 1000, LOCALHOST, (error, availablePort) => {
            if (error) {
                reject();
            }

            resolve(availablePort);
        });
    });
}



export const zipDirectory = (source: string, out: string) => {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(out);

    return new Promise((resolve, reject) => {
        archive
            .directory(source, false)
            .on('error', (err: any) => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
}


export const deleteDirectory = (path: string) => {
    if(fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            const curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteDirectory(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
};


export const createPluridocFile = async (filename: string) => {
    const file = filename + PLURIDOC_EXTENSION;

    fs.mkdirSync(filename);
    const assets = filename + '/assets';
    fs.mkdirSync(assets);
    const images = assets + '/images';
    fs.mkdirSync(images);
    const videos = assets + '/videos';
    fs.mkdirSync(videos);
    const audios = assets + '/audios';
    fs.mkdirSync(audios);
    const objects = assets + '/objects';
    fs.mkdirSync(objects);
    const webpages = assets + '/webpages';
    fs.mkdirSync(webpages);
    const waria = assets + '/waria';
    fs.mkdirSync(waria);
    const plurids = filename + '/plurids';
    fs.mkdirSync(plurids);

    await zipDirectory(filename, file);

    deleteDirectory(filename);
}


export const checkAndSetContentIDs = async (
    content: PluridocPlane[],
    filePath: string,
): Promise<PluridocPlane[]> => {
    const updatedContent = content.map(plane => {
        if (!plane.metadata.id) {
            const newPlane = { ...plane };
            const id = crypto.randomBytes(16).toString('hex');
            newPlane.metadata.id = id;
            return newPlane;
        }
        return plane;
    });

    const pluridocString = pluridocDataToPluridocString(updatedContent);
    fs.writeFile(filePath, pluridocString, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    return updatedContent;
}
