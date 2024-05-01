import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {DialogsService} from "./dialogs.service";
import {DialogCreateDto} from "./dto/dialog-create.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('dialogs')
export class DialogsController {
    constructor(private dialogService: DialogsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    getDialogs(@Query("page") page: number,@Req() {userId}: any){
        return this.dialogService.getAll(userId, page);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getDialog(@Param("id") id: number, @Req() {userId}: any){
        return this.dialogService.getById(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    createDialog(@Req() {userId}: any, @Body(){ participantIds }: DialogCreateDto){
        return this.dialogService.create(userId, participantIds);
    }
}
