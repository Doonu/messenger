import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Message} from "./models/messages.model";
import {CreateMessageDto, CreateMessageReadStatusDto} from "./dto/create-message.dto";
import {Op} from "sequelize";
import {GetMessagesDto} from "./dto/get-messages.dto";
import {MessageReadStatus} from "./models/messagesReadStatus.model";
import {Dialog} from "../dialogs/dialogs.model";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Dialog) private dialogRepository: typeof Dialog,
        @InjectModel(Message) private messageRepository: typeof Message,
        @InjectModel(MessageReadStatus) private messageReadStatus: typeof MessageReadStatus
    ) {
    }

    async getById(id: number){
        return await this.messageRepository.findOne({where: {id: id}, include: {all: true}})
    }

    async create({userId, content, dialogId, status = 'main'}: CreateMessageDto){
        const created = await this.messageRepository.create({userId, dialogId, content, status: status})
        const dialog = await this.dialogRepository.findByPk(dialogId)
        await dialog.update({lastMessageId: created.id})
        return await this.messageRepository.findOne({where: {id: created.id}, include: {all: true}})
    }

    async createMessageReadStatus({messageId, participants, userId, dialogId}: CreateMessageReadStatusDto){
        participants.map(async user => {
            await this.messageReadStatus.create({messageId: messageId, userId: user.id, readStatus: userId === user.id, dialogId: dialogId})
        })
    }

    async updateReadStatus(messageId: number, userId: number){
        const findMessage = await this.messageReadStatus.findOne({where: {messageId: messageId, userId: userId}})
        await findMessage.update({readStatus: true})
    }

    async getAllByDialogId({page, dialogId, userId,limit = 30}: GetMessagesDto){
        let currentPage = page - 1;

        const packMessages = await this.messageRepository.findAll({
            where:
                {dialogId: dialogId},
            include: {all: true},
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: currentPage * limit,
        })

        const updateMessages = await Promise.all(packMessages.map(async message => {
            const messageStatus = await this.messageReadStatus.findOne({where: {messageId: message.id, userId: userId}})
            return {
                ...JSON.parse(JSON.stringify(message)),
                readStatus: messageStatus.readStatus
            }
        }))

        return updateMessages.reverse()
    }

    async deleteById(id: number[], dialogId: number){
        await this.messageReadStatus.destroy({
            where: {
                messageId: {
                    [Op.in]: id
                }
            }
        })

        await this.messageRepository.destroy({
            where: {
                id: {
                    [Op.in]: id
                }
            }
        })

        const dialog = await this.dialogRepository.findByPk(dialogId)
        const lastDialogMessage = await this.messageRepository.findAll({where: {dialogId: dialogId}})

        await dialog.update({lastMessageId: lastDialogMessage[lastDialogMessage?.length - 1]?.id})
    }

    async updateById(id: number, userId: number, content: string[]){
        const findMessage = await this.messageRepository.findOne({where: {id: id}})
        if(userId === findMessage.userId){
            await findMessage.update({content: content})
        }
    }
}
