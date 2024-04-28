import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {MessagesService} from "./messages.service";
import {Server} from "socket.io";
import {CreateMessageDto} from "./dto/create-message.dto";
import {DialogsService} from "../dialogs/dialogs.service";
import {DeleteMessagesDto} from "./dto/delete-messages.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {CreateFixedMessageDto} from "./dto/create-fixedMessage.dto";
import {DeleteFixedMessageDto} from "./dto/delete-fixedMessage.dto";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000'],
    },
})
export class MessagesRealtimeService{
    constructor(
        private messageService: MessagesService,
        private dialogsService: DialogsService
    ) {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage("create_message")
    async handleCreateMessage(@MessageBody() dto: CreateMessageDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        const createdMessage = await this.messageService.create({userId: dto.userId, dialogId: dto.dialogId, content: dto.content })

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("new_message", createdMessage)
        })
    }

    @SubscribeMessage("create_fixed_message")
    async handleCreateFixedMessage(@MessageBody() dto: CreateFixedMessageDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        const createdMessage = await this.dialogsService.createFixed(dto.dialogId, dto.messageId)

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("new_fixed_message", createdMessage)
        })
    }

    @SubscribeMessage("update_message")
    async handleUpdateMessage(@MessageBody() dto: UpdateMessageDto){
        let updateFixedMessage = null;
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        await this.messageService.updateById(dto.id, dto.userId, dto.content);

        if(dto.id === activeDialog.fixedMessageId){
            updateFixedMessage = await this.messageService.getById(dto.id)
        }

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("edit_message", {
                dialogId: activeDialog.id,
                id: dto.id,
                content: dto.content,
                updateFixedMessage: updateFixedMessage
            })
        })
    }

    @SubscribeMessage("delete_fixed_message")
    async handleDeleteFixedMessage(@MessageBody() dto: DeleteFixedMessageDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        await this.dialogsService.deleteFixed(dto.dialogId)

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("remove_fixed_message", {
                dialogId: dto.dialogId
            })
        })
    }


    @SubscribeMessage("delete_messages")
    async handleDeleteMessages(@MessageBody() dto: DeleteMessagesDto){
        let isFixedDeleteMessage = false;

        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        await this.messageService.deleteById(dto.messagesId);

        if(dto.messagesId.find(el => el === activeDialog.fixedMessageId)){
            isFixedDeleteMessage = true;
            await this.dialogsService.deleteFixed(dto.dialogId)
        }


        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("remove_message", {
                dialogId: activeDialog.id,
                messagesId: dto.messagesId,
                isFixedDeleteMessage
            })
        })
    }
}