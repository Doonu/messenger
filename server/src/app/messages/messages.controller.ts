import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";



@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    getAllMessages(@Query("dialogId") dialogId: number){
        return this.messagesService.getAllByDialogId(dialogId)
    }
}
