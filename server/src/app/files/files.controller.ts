import {Body, Controller, Post, Req, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {AnyFilesInterceptor} from "@nestjs/platform-express";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FilesService} from "./files.service";
import {AddingWaitingListDto} from "./dto/adding-waiting-list.dto";

@Controller('files')
export class FilesController {
    constructor(private fileService: FilesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/pending')
    @UseInterceptors(AnyFilesInterceptor())
    addingWaitingList(@UploadedFiles() files: Array<Express.Multer.File>, @Body() {status}: AddingWaitingListDto, @Req() {userId}: any){
        return this.fileService.addPending(files, status, userId)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/clearTrash')
    clearTrash(@Req() {userId}: any, @Body() {status}: AddingWaitingListDto){
        return this.fileService.clearTrash(userId, status)
    }
}
