import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {Post} from "./posts.model";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {UpdatePostCommentsDto, UpdatePostLikeDto} from "./dto/update-post.dto";
import { UpdatePostDto} from "../comments/dto/update-comment.dto";

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {
    }

    async create(dto: CreatePostDto, userId: number) {
        const newFiles = await this.fileService.renameFiles(dto.files, dto.status)
        await this.fileService.clearTrash(userId, dto.status)

        const createdPost = await this.postRepository.create({...dto, userId,files: newFiles})
        return await this.postRepository.findOne({where: { id: createdPost.id }, include: { all: true } })
    }

    async deleteById(id: number, userId: number){
        const savedPost = await this.postRepository.findOne({ where : { id: id } })

        if(savedPost.userId !== userId){
            throw new HttpException("У вас нет прав удалять этот пост", HttpStatus.BAD_REQUEST);
        }

       if(savedPost.files){
           const newFilesName = await this.fileService.renameUpdatePending(savedPost.files, userId, 2)
           await savedPost.update({files: newFilesName})
       }

        await this.postRepository.destroy({where: {id: id}})
        return savedPost
    }

    async restoreById(id: number){
        const post = await this.postRepository.findByPk(id, {paranoid: false})
        await post.restore()

        if(post.files){
            const newFiles = await this.fileService.renameFiles(post.files, 2)
            await post.update({files: newFiles})
        }

        return post;
    }

    async updatePost(dto: UpdatePostDto, userId: number){
        const oldPost = await this.postRepository.findOne({ where: {id: dto.id} })

        if(oldPost.userId !== userId){
            throw new HttpException("У вас нет прав изменять этот пост", HttpStatus.BAD_REQUEST);
        }

        const deletedFiles = oldPost?.files?.filter(file => {
            if(dto.files){
                return !dto.files.find((newFile) => {
                    return file.id === newFile.id
                })
            } else {
                return true
            }
        })

        await this.fileService.removeFiles(deletedFiles)

        let newFiles = []

        if(dto.files?.length){
             newFiles = await this.fileService.renameFiles(dto.files, dto.status)
        }


        await oldPost.update({files: newFiles, content: [...dto.content], isDisabledComments: dto.isDisabledComments, view: dto.view})
        return await this.postRepository.findOne({where: {id: dto.id}, include: { all: true } })
    }

    //TODO: Получение постов только друзей
    //TODO: Не отправлять пароль
      /*
    *
    *  Если сортировки нет, то дефолтная сортировка по дате создания order: [['createdAt', 'DESC']]
    *
    * */
    async getAll(page: number){
        let currentPage = page - 1;
        const limit = 10;

        return await this.postRepository.findAll({include: {all: true}, order: [['createdAt', 'DESC']], limit: limit, offset: currentPage * limit });
    }

    async toggleComments(dto: UpdatePostCommentsDto, userId: number){
        const savedPost = await this.postRepository.findOne({ where : { id: dto.postId } })

        if(savedPost.userId !== userId && dto.isDisabledComments){
            throw new HttpException("У вас нет прав скрывать комментарии", HttpStatus.BAD_REQUEST);
        }

        if(savedPost.userId !== userId && !dto.isDisabledComments){
            throw new HttpException("У вас нет прав открывать комментарии", HttpStatus.BAD_REQUEST);
        }

        await savedPost.update({isDisabledComments: !dto.isDisabledComments})

        return {
            postId: savedPost.id,
            isDisabledComments: savedPost.isDisabledComments
        }
    }

    async toggleLike(dto: UpdatePostLikeDto, userId: number){
        const savedPost = await this.postRepository.findOne({ where : { id: dto.postId } })
        let isLike = false;

        if(!savedPost.likesList.includes(userId)){
            await savedPost.update({likesList: [...savedPost.likesList, userId], countLikes: savedPost.countLikes + 1})
            isLike = true
        } else {
            const newLikeList = savedPost.likesList.filter(likeUserId => likeUserId !== userId);
            await savedPost.update({likesList: [...newLikeList], countLikes: savedPost.countLikes - 1})
        }

        return {
            postId: savedPost.id,
            isLike: isLike
        }
    }
}
