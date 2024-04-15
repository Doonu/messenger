import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Message} from "./messages.model";
import {CreateMessageDto} from "./dto/create-message.dto";
import {Op} from "sequelize";

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message) private messageRepository: typeof Message
    ) {
    }

    async create({userId, content, dialogId}: CreateMessageDto){
        const created = await this.messageRepository.create({userId, dialogId, content})
        return await this.messageRepository.findOne({where: {id: created.id}, include: {all: true}})
    }

    async getAllByDialogId(dialogId: number){
        return await this.messageRepository.findAll({where: {dialogId: dialogId}, include: {all: true}, order: [['createdAt', 'ASC']]})
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
