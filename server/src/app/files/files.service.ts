import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
import sizeOf from 'image-size'
import {IFile} from "../posts/dto/create-post.dto";

@Injectable()
export class FilesService {
    extensionPhotoList = ['jpg', 'png', 'webp', 'svg', 'gif', 'jpeg', 'bmp'];

    async renameFiles(files: IFile[], status: number){
        try {
            if(!files.length) return;
            const statusPhoto = this.statusName(status)
            const filePath = path.resolve(__dirname, "../../../", 'static')
            let newFiles = [];

            files.forEach(item => {
                if(item.url.split("_")[1] === statusPhoto){
                    const status = 'fulfilled';
                    const userId = item.url.split("_")[0]
                    const expansion = item.url.split(".")[item.url.split(".").length - 1]

                    const newFileName = userId + "_" + status + "_" + item.id + `.${expansion}`;
                    const newUrlName = filePath + "/" + newFileName

                    newFiles.push({
                        ...item,
                        url: newFileName
                    })

                    fs.renameSync(filePath + "/" + item.url, newUrlName)
                } else  {
                    newFiles.push(item)
                }
            })

            return newFiles
        } catch (e){
            throw new HttpException("Произошла ошибка при переименовании файлов", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async clearTrash(userId: number, status: number){
        const filePath = path.resolve(__dirname, "../../../", 'static')
        const files_fs = fs.readdirSync(filePath)

        files_fs.forEach(el => {
            const array = el.split("_")
            if(array[1] === this.statusName(status) && userId === +array[0]){
                fs.unlink(filePath + '/' + el, () => {})
            }
        })
    }

    async renameUpdatePending(files: IFile[], userId: number, status: number){
        try {
            if(!files.length) return []
            const filePath = path.resolve(__dirname, "../../../", 'static')
            let newFiles = [];

            files.forEach((file) => {
                const array = file.originalName.split('.');
                const expansion = array[array.length - 1]
                const statusPhoto = this.statusName(status)

                const newFileName = userId + "_" + statusPhoto + "_" + file.id + `.${expansion}`;
                const newUrlName = filePath + "/" + newFileName;

                newFiles.push({
                    ...file,
                    url: newFileName
                })

                fs.renameSync(filePath + "/" + file.url, newUrlName)
            })

            return newFiles
        } catch (e){
            throw new HttpException("Произошла ошибка при изменении файла в режим ожидания", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async removeFiles(files: IFile[]){
        if(!files?.length) return []
        const filePath = path.resolve(__dirname, "../../../", 'static')

        files.forEach(file => {
            fs.unlinkSync(filePath + '/' + file.url)
        })
    }

    async replaceBuffer(file: Express.Multer.File, status, idPhoto){
        const filePath = path.resolve(__dirname, "../../../", 'static')
        const files_fs = fs.readdirSync(filePath)
        const statusPhoto = this.statusName(status)
        const id = uuid.v4()
        let result;

        files_fs.forEach(fileInDirectory => {
            const fileId = fileInDirectory.split("_")[2].split(".")[0]

            if(fileId === idPhoto){
                const newFileName = fileInDirectory.replace(fileId, id).replace(fileInDirectory.split("_")[1], statusPhoto)
                const expansion = fileInDirectory.split(".")[1]

                fs.writeFileSync(path.join(filePath, newFileName), file.buffer)

                result = {
                    id: id,
                    url: newFileName,
                    originalName: "new_name",
                    size: file.size,
                    type: file.mimetype,
                    dimensions: null
                }

                if(this.extensionPhotoList.includes(expansion)){
                    const dimensions = sizeOf(`static/${fileInDirectory}`);

                    result = {
                        ...result,
                        dimensions: {
                            height: dimensions.height,
                            width: dimensions.width
                        }
                    }

                }

            }
        })

        return result
    }

    async addPending(files: Array<Express.Multer.File> , status: number, userId: number): Promise<any[]>{
        try {
            if(!files.length) return []
            const statusPhoto = this.statusName(status)
            let fileNames = [];
            const filePath = path.resolve(__dirname, "../../../", 'static')

            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }

            files.forEach((file) => {
                const array = file.originalname.split('.');
                const expansion = array[array.length - 1]
                const id = uuid.v4()

                const fileName = userId + "_" + statusPhoto + "_" + id + `.${expansion}`

                fs.writeFileSync(path.join(filePath, fileName), file.buffer)

                let newParamFile = {
                    id: id,
                    url: fileName,
                    originalName: file.originalname,
                    size: file.size,
                    type: file.mimetype,
                    dimensions: null
                }

                if(this.extensionPhotoList.includes(expansion)){
                    const dimensions = sizeOf(`static/${fileName}`);

                    newParamFile = {
                        ...newParamFile,
                        dimensions: {
                            height: dimensions.height,
                            width: dimensions.width
                        }
                    }

                }

                fileNames.push({
                    ...newParamFile,
                })
            })

            return fileNames

        } catch (e){
            throw new HttpException("Произошла ошибка при записи файла в список ожиданий", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    statusName (status: number){
        return +status === 1 ? 'pendingAddPost' : 'pendingEditPost';
    }
}
