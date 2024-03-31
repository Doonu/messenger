import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Notifications} from "./notifications.model";
import {CreateNotificationsDto} from "./dto/create-notifications.dto";
import {DeleteNotificationDto} from "./dto/delete-notification.dto";
import {DeleteNotificationsDto} from "./dto/delete-notifications.dto";

@Injectable()
export class NotificationsService {
    constructor(
        @InjectModel(Notifications) private notificationsRepository: typeof Notifications
    ) {
    }

    async createNotifications(dto: CreateNotificationsDto){
        const searchedNotify = await this.notificationsRepository.findOne({where: {senderId: dto.senderId, userId: dto.userId, content: dto.content}, include: {all: true}})

        if(!searchedNotify?.id) {
            const notification = await this.notificationsRepository.create({...dto})
            return await this.notificationsRepository.findOne({where: {id: notification.id}, include: {all: true}})
        }
    }

    async deleteNotification(dto: DeleteNotificationDto){
        await this.notificationsRepository.destroy({where: {id: dto.notificationId}})
    }

    async deleteNotifications(dto: DeleteNotificationsDto){
        await this.notificationsRepository.destroy({where: {userId: dto.userId}})
    }

    async getAllNotifications(userId: number, page: number, limit: number){
        let currentPage = page - 1;

        return await this.notificationsRepository.findAll({where: {userId: userId}, include: {all: true}, limit: limit, offset: currentPage * limit})
    }

    async getAllNotificationsCount(userId: number){
        const arrayNotification = await this.notificationsRepository.findAll({where: {userId: userId}, include: {all: true}})
        return arrayNotification.length;
    }
}
