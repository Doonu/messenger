import {Controller, Delete, Get, Param, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NotificationsService} from "./notifications.service";

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    getAllNotifications(@Req() {userId}: any){
        return this.notificationsService.getAllNotifications(userId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteByIdNotification(@Req() {userId}: any, @Param("id") id: number,){
        return this.notificationsService.deleteNotification({userId: userId, senderId: id})
    }
}
