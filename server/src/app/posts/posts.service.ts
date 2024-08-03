import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {Post} from "./posts.model";
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {UpdatePostCommentsDto, UpdatePostLikeDto} from "./dto/update-post.dto";
import { UpdatePostDto} from "../comments/dto/update-comment.dto";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post) private postRepository: typeof Post,
        private fileService: FilesService
    ) {
    }

    async create(dto: CreatePostDto, files: Express.Multer.File[], userId: number) {
        const newFiles = await this.fileService.addFiles(files)

        const createdPost = await this.postRepository.create({
            content: dto.content,
            view: dto.view,
            isDisabledComments: dto.isDisabledComments,
            userId,
            files: newFiles
        });

        return await this.postRepository.findOne({where: { id: createdPost.id }, include: { all: true } });
    }

    async deleteById(id: number, userId: number){
        const savedPost = await this.postRepository.findOne({ where : { id: id } })

        if(savedPost.userId !== userId){
            throw new HttpException("У вас нет прав удалять этот пост", HttpStatus.BAD_REQUEST);
        }

        await this.postRepository.destroy({where: {id: id}})
        return savedPost
    }

    async restoreById(id: number){
        const post = await this.postRepository.findByPk(id, {paranoid: false})
        await post.restore()

        return post;
    }

    //TODO: переделать
    async updatePost(dto: UpdatePostDto, userId: number, files: Express.Multer.File[]){
        const oldPost = await this.postRepository.findOne({ where: {id: dto.id} })

        if(oldPost.userId !== userId){
            throw new HttpException("У вас нет прав изменять этот пост", HttpStatus.BAD_REQUEST);
        }

        const deletedFiles = [];
        const addFiles = [];
        const stateFiles = []

        if(!dto?.files || !dto?.files?.length){
            deletedFiles.push(...oldPost.files)
        } else {
            dto.files?.forEach((file, index) => {
                if(!file.url){
                    if(oldPost.files?.length){
                        const isFind = oldPost.files.find(el => el.uid === file.uid);

                        if (!isFind) addFiles.push(files[index]);
                        if(isFind) stateFiles.push(files[index]);
                    } else {
                        addFiles.push(files[index]);
                    }
                } else {
                    stateFiles.push(file);
                }
            })
        }

        await this.fileService.removeFiles(deletedFiles)
        const newFiles = await this.fileService.addFiles(addFiles)

        await oldPost.update({files: [...stateFiles, ...newFiles], content: [...dto.content], isDisabledComments: dto.isDisabledComments, view: dto.view})
        return await this.postRepository.findOne({where: {id: dto.id}, include: { all: true } })
    }

    //TODO: Получение постов только друзей
    //TODO: Не отправлять пароль
      /*
    *  Если сортировки нет, то дефолтная сортировка по дате создания order: [['createdAt', 'DESC']]
    * */
    async getAll(page: number, userId?: number){
        let currentPage = page - 1;
        const limit = 30;

        if(userId){
            return await this.postRepository.findAll(
                {
                    include: {all: true},
                    where: { userId: userId } ,
                    order: [['createdAt', 'DESC']],
                    limit: limit,
                    offset: currentPage * limit
                }
            )
        }

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
