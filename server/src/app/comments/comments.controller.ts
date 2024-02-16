import {Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentsService} from "./comments.service";
import {ToggleLikeCommentDto, UpdateCommentDto} from "./dto/update-comment.dto";

@Controller('posts/comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    createComment(
        @Body() dto: CreateCommentDto,
        @Req() {userId}: any
    ){
        return this.commentService.createComment(dto, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteComment(
        @Param("id") id: number,
        @Req() {userId}: any
    ){
        return this.commentService.deleteComment(id, userId)
    }

    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    getAllCommentsPost(
        @Param('id') id: number,
        @Query("orderBy") orderBy: string,
        @Query("orderDirection") orderDirection: number,
        @Query("page") page: number,
        @Query("limit") limit: number
    ){
        return this.commentService.getAllCommentsInPost(id, orderBy, orderDirection, page, limit)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/like')
    toggleLike(@Body() dto: ToggleLikeCommentDto, @Req() {userId}: any){
        return this.commentService.toggleLikeComment(dto, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Put('')
    updateComment(@Body() dto: UpdateCommentDto, @Req() {userId}: any){
        return this.commentService.updateComment(dto, userId)
    }
}


