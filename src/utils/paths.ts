import path from 'path';

export function getBasename(filePath:string):string {
    const baseName = path.basename(filePath, path.extname(filePath))

    if (baseName.includes('.')) {
        return baseName.split('.')[0]
    }
    return baseName

}