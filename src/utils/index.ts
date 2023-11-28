import { getFileOpenKey } from '@/api';

export const formatFileSize = (bytes: number) => {
    let i = 0;
    let units = ['bytes', 'KB', 'MB', 'GB', 'TB'];

    do {
        bytes /= 1024;
        i++;
    } while (bytes > 1024);

    return Math.max(bytes, 0.1).toFixed(1) + ' ' + units[i];
}

const videoSuffix = "ts, m2ts, rm, rmvb, avi, mid, webm, mpg, mp2, mpeg, mpe, mpv, ogg, mp4, m4p, m4v, wmv, mov, flv, ogv, 3gp, 3g2, mkv, aac, mp3, oga, opus, wav, weba, flac, pcm, m4a, aifc, aiff".toLowerCase().replace(/\s+/g, '').split(',');
const pictureSuffix = "BMP、JPG、JPEG、PNG、GIF".replace(/\s+/g, '').toLowerCase().split('、');
const textSuffix = "txt,sql".replace(/\s+/g, '').toLowerCase().split(',');


const checkSuffix = (fileName: string, suffixs: string[]): boolean => {
    const fileSuffix = fileName.split(".").pop();
    if (!fileSuffix) {
        return false;
    }
    return suffixs.indexOf(fileSuffix.toLowerCase()) != -1;
}

export const isVideo = (fileName: string): boolean => {
    return checkSuffix(fileName, videoSuffix);
}

export const isPicture = (fileName: string): boolean => {
    return checkSuffix(fileName, pictureSuffix);
}

export const isText = (fileName: string): boolean => {
    return checkSuffix(fileName, textSuffix);
}

export const openVideo = async (url4Encode: string, name: string) => {
    name = name.trim();
    name = name.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g, '');
    const fileOpenKey =  await getFileOpenKey();
    window.open(`vlc://http://${window.location.host}/comm/mp4/${fileOpenKey}/${url4Encode}/${name}`, '_self');
}


export const prefixZero = (num: number, n: number): string => {
    return (Array(n).join('0') + num).slice(-n);
}
