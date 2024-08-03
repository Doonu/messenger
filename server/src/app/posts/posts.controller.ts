import {
    Body,
    Controller,
    Delete,
    Get, Param, Patch,
    Post, Put, Query, Req, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdatePostCommentsDto, UpdatePostLikeDto} from "./dto/update-post.dto";
import {UpdatePostDto} from "../comments/dto/update-comment.dto";

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {
    }
    // @UseGuards(RolesGuard)
    // @UseGuards(JwtAuthGuard)
    @Get('')
    getAllPosts(
        @Query("page") page: number,
        @Query("userId") userId: number,
    ){
        return this.postService.getAll(page, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    @UseInterceptors(AnyFilesInterceptor())
    createPost(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: CreatePostDto,
        @Req() {userId}: any
    ){
        return this.postService.create(dto, files, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Put('')
    @UseInterceptors(AnyFilesInterceptor())
    updatePost(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: UpdatePostDto,
        @Req() {userId}: any
    ){
        return this.postService.updatePost(dto, userId, files)
    }

    @Post('/restore/:id')
    @ApiResponse({ status: 200, type: Post })
    restorePostById(@Param("id") id: number){
        return this.postService.restoreById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/toggle-comments')
    toggleComments(@Body() dto: UpdatePostCommentsDto, @Req() {userId}: any){
        return this.postService.toggleComments(dto, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/like')
    toggleLike(@Body() dto: UpdatePostLikeDto, @Req() {userId}: any){
        return this.postService.toggleLike(dto, userId)
    }

    // @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ status: 200, type: Post })
    deletePostById(@Param("id") id: number, @Req() {userId}: any){
        return this.postService.deleteById(id, userId)
    }
}
