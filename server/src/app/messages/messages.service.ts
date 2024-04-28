import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Message} from "./messages.model";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Op} from "sequelize";
import {GetMessagesDto} from "./dto/get-messages.dto";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message) private messageRepository: typeof Message
    ) {
    }

    async getById(id: number){
        return await this.messageRepository.findOne({where: {id: id}, include: {all: true}})
    }

    async create({userId, content, dialogId}: CreateMessageDto){
        const created = await this.messageRepository.create({userId, dialogId, content})
        return await this.messageRepository.findOne({where: {id: created.id}, include: {all: true}})
    }

    async getAllByDialogId({page, dialogId, limit = 30}: GetMessagesDto){
        let currentPage = page - 1;

        const packMessages = await this.messageRepository.findAll({
            where:
                {dialogId: dialogId},
            include: {all: true},
            order: [['createdAt', 'DESC']],
            limit: limit,
            offset: currentPage * limit,
        })
        return packMessages.reverse()
    }

    async deleteById(id: number[]){
        await this.messageRepository.destroy({
            where: {
                id: {
                    [Op.in]: id
                }
            }
        })
    }

    async updateById(id: number, userId: number, content: string[]){
        const findMessage = await this.messageRepository.findOne({where: {id: id}})
        if(userId === findMessage.userId){
            await findMessage.update({content: content})
        }
    }
}
