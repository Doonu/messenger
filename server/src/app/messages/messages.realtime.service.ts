import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {MessagesService} from "./messages.service";
import {Server} from "socket.io";
import {CreateMessageDto} from "./dto/create-message.dto";
import {DialogsService} from "../dialogs/dialogs.service";
import {DeleteMessagesDto} from "./dto/delete-messages.dto";
import {Req, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateMessageDto} from "./dto/update-message.dto";

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

    @SubscribeMessage("update_message")
    async handleUpdateMessage(@MessageBody() dto: UpdateMessageDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        await this.messageService.updateById(dto.id, dto.userId, dto.content);

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("edit_message", {
                dialogId: activeDialog.id,
                id: dto.id,
                content: dto.content,
            })
        })
    }


    @SubscribeMessage("delete_messages")
    async handleDeleteMessages(@MessageBody() dto: DeleteMessagesDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);
        await this.messageService.deleteById(dto.messagesId);

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("remove_message", {
                dialogId: activeDialog.id,
                messagesId: dto.messagesId,
            })
        })
    }
}