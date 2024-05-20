import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {MessagesService} from "./messages.service";
import {Server} from "socket.io";
import {CreateMessageDto} from "./dto/create-message.dto";
import {DialogsService} from "../dialogs/dialogs.service";
import {DeleteMessagesDto} from "./dto/delete-messages.dto";
import {UpdateMessageDto} from "./dto/update-message.dto";
import {CreateFixedMessageDto} from "./dto/create-fixedMessage.dto";
import {DeleteFixedMessageDto} from "./dto/delete-fixedMessage.dto";
import {ReadMessageDto} from "./dto/read-message.dto";
import {UsersService} from "../users/users.service";
import {DeleteUserChatDto} from "./dto/delete-UserChat.dto";
import {AddNewUserInChatDto} from "./dto/add-newUserInChat.dto";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000'],
    },
})
export class MessagesRealtimeService{
    constructor(
        private messageService: MessagesService,
        private dialogsService: DialogsService,
        private usersService: UsersService
    ) {
    }

    @WebSocketServer() server: Server;

    @SubscribeMessage("create_message")
    async handleCreateMessage(@MessageBody() dto: CreateMessageDto){
        const activeDialog = await this.dialogsService.getByIdAndCount(dto.dialogId, dto.userId);
        const createdMessage = await this.messageService.create({userId: dto.userId, dialogId: dto.dialogId, content: dto.content })
        await this.messageService.createMessageReadStatus({messageId: createdMessage.id, participants: activeDialog.participants, userId: dto.userId, dialogId: dto.dialogId})

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("new_message", createdMessage)
        })
    }

    @SubscribeMessage("read_message")
    async handleReadMessage(@MessageBody() dto: ReadMessageDto){
        const user = await this.usersService.getUser(dto.userId)
        await this.messageService.updateReadStatus(dto.messageId, dto.userId)

        this.server.to(user.socket_id).emit("delivered_message", {
            dialogId: dto.dialogId,
            messageId: dto.messageId
        })
    }

    @SubscribeMessage("create_fixed_message")
    async handleCreateFixedMessage(@MessageBody() dto: CreateFixedMessageDto){
        const activeDialog = await this.dialogsService.getByIdAndCount(dto.dialogId, dto.userId);
        const createdMessage = await this.dialogsService.createFixed(dto.dialogId, dto.messageId)

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("new_fixed_message", createdMessage)
        })
    }

    @SubscribeMessage("update_message")
    async handleUpdateMessage(@MessageBody() dto: UpdateMessageDto){
        let updateFixedMessage = null;
        const activeDialog = await this.dialogsService.getByIdAndCount(dto.dialogId, dto.userId);
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
        const activeDialog = await this.dialogsService.getByIdAndCount(dto.dialogId, dto.userId);
        await this.dialogsService.deleteFixed(dto.dialogId)

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit("remove_fixed_message", {
                dialogId: dto.dialogId
            })
        })
    }

    @SubscribeMessage("user_add_chat")
    async handlerAddNewUser(@MessageBody() dto: AddNewUserInChatDto){
        const activeDialog = await this.dialogsService.getById(dto.dialogId);

        const users = await this.usersService.getUsersByIds(dto.participants);
        const allUsers = [...activeDialog.participants, ...users]

        const messages = await Promise.all(users.map(async user => {
            const message = await this.messageService.create({userId: user.id, dialogId: dto.dialogId, content: [`${user.name} присоединился к группе`], status: 'info'});
            await this.messageService.createMessageReadStatus({dialogId: dto.dialogId, userId: dto.userId, messageId: message.id, participants: allUsers});
            return message;
        }))

        await activeDialog.$set("participants", allUsers)
        activeDialog.participants = allUsers

        activeDialog.participants.forEach(player => {
            this.server.to(player.socket_id).emit('add_new_user', {
                messages: messages,
                dialogId: activeDialog.id,
                participants: users,
            })
        })
    }

    @SubscribeMessage("user_out_chat")
    async userOutOfChat(@MessageBody() dto: DeleteUserChatDto){
        const findDialog = await this.dialogsService.getById(dto.dialogId)

        const saveEmitParticipants = findDialog.participants;
        const filterParticipants = findDialog.participants.filter(user => user.id !== +dto.participant);
        const user = await this.usersService.getUser(dto.participant)
        const message = await this.messageService.create({userId: dto.participant, dialogId: dto.dialogId, content: [`${user.name} вышел из груупы`], status: 'info'});
        await this.messageService.createMessageReadStatus({dialogId: dto.dialogId, userId: dto.participant, messageId: message.id, participants: findDialog.participants});

        await findDialog.$set("participants", filterParticipants)
        findDialog.participants = filterParticipants

        saveEmitParticipants.forEach(player => {
            this.server.to(player.socket_id).emit("delete_user_chat", {
                participant: dto.participant,
                dialogId: findDialog.id,
                message: message,
            })
        })
    }

    @SubscribeMessage("delete_messages")
    async handleDeleteMessages(@MessageBody() dto: DeleteMessagesDto){
        let isFixedDeleteMessage = false;

        const activeDialog = await this.dialogsService.getByIdAndCount(dto.dialogId, dto.userId);
        await this.messageService.deleteById(dto.messagesId, dto.dialogId);

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