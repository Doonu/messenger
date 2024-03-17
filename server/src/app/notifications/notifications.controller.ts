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
    deleteByIdNotification(@Param("id") notificationId: number){
        return this.notificationsService.deleteNotification({ notificationId })
    }

    @UseGuards(JwtAuthGuard)
    @Delete("user/:id")
    deleteAllNotificationById(@Param("id") userId: number){
        return this.notificationsService.deleteNotifications({ userId })
    }
}
