import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import {generateUrl} from "../../utils/generateUrl";
import {IFile} from "../posts/dto/create-post.dto";

@Injectable()
export class FilesService {
    extensionPhotoList = ['jpg', 'png', 'webp', 'svg', 'gif', 'jpeg', 'bmp'];
    filePath = path.resolve(__dirname, "../../../", 'static');

    async addFiles(files: Express.Multer.File[]){
        try {
            if(!files.length) return [];

            let savedFiles: IFile[] = [];

            savedFiles = files.map(item => {
                const expansion = item.originalname.split(".")[item.originalname.split(".").length - 1];

                const lastDotIndex = item.originalname.lastIndexOf(".")
                const fileName = item.originalname.substring(0, lastDotIndex) + Date.now() + `.${expansion}`;
                const urlName = this.filePath + "/" + fileName;

                fs.writeFileSync(urlName, item.buffer);

                return {
                    uid: item.size + Date.now(),
                    name: fileName,
                    url: generateUrl(fileName),
                    size: item.size,
                    type: item.mimetype,
                };
            })

            return savedFiles;
        } catch (e){
            throw new HttpException("Произошла ошибка при добавлении новых файлов", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeFiles(files: IFile[]){
        if(!files?.length) return []
        const filePath = path.resolve(__dirname, "../../../", 'static')

        files.forEach(file => {
            fs.unlinkSync(filePath + '/' + file.name)
        })
    }
}
