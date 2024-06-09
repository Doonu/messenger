import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {DialogsService} from "./dialogs.service";
import {DialogCreateDto} from "./dto/dialog-create.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DialogDeleteUserDto} from "./dto/dialog-deleteUser.dto";

@Controller('dialogs')
export class DialogsController {
    constructor(private dialogService: DialogsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    getDialogs(@Query("page") page: number, @Query('search') search: string, @Req() {userId}: any){
        return this.dialogService.getAll({userId, search, page});
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getDialog(@Param("id") id: number, @Req() {userId}: any){
        return this.dialogService.getByIdAndCount(id, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    createDialog(@Req() {userId}: any, @Body(){ participantIds, nameChat }: DialogCreateDto){
        return this.dialogService.create(userId, participantIds, nameChat);
    }
}
