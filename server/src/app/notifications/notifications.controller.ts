import {Controller, Delete, Get, Param, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NotificationsService} from "./notifications.service";

@Controller('notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    getAllNotifications(@Req() {userId}: any, @Query("page") page: number,@Query("limit") limit: number,){
        return this.notificationsService.getAllNotifications(userId, page, limit);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/count")
    getAllNotificationsCount(@Req() {userId}: any,){
        return this.notificationsService.getAllNotificationsCount(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    deleteByIdNotification(@Param("id") notificationId: number){
        return this.notificationsService.deleteNotification({ notificationId });
    }

    @UseGuards(JwtAuthGuard)
    @Delete("user/:id")
    deleteAllNotificationById(@Param("id") userId: number){
        return this.notificationsService.deleteNotifications({ userId });
    }
}
