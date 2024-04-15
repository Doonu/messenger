import {Body, Controller, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {DialogsService} from "./dialogs.service";
import {DialogCreateDto} from "./dto/dialog-create.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DialogCreateFixedDto} from "./dto/dialog-createfixed.dto";

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
    getDialog(@Param("id") id: number){
        return this.dialogService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    createDialog(@Req() {userId}: any, @Body(){ participantIds }: DialogCreateDto){
        return this.dialogService.create(userId, participantIds);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/createFixed")
    createFixed(@Body() data: DialogCreateFixedDto){
        return this.dialogService.createFixed(data.dialogId, data.messageId)
    }
}
