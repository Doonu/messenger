import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection, OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import {UsersService} from "../../users.service";
import {FriendRequestDto} from "./dto/friend-request.dto";
import {AcceptFriendRequestDto} from "../../dto/accept-friend-request.dto";
import { Server } from "socket.io";
import {NotificationsService} from "../../../notifications/notifications.service";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000'],
    },
})
export class FriendRequestService implements OnGatewayConnection, OnGatewayDisconnect{
    constructor(
        private usersService: UsersService,
        private notificationsService: NotificationsService
    ) {
    }

    @WebSocketServer() server: Server;

    async handleConnection(@ConnectedSocket() client: any) {
        const userId = client.handshake.query['user_id'];

        if(userId){
            await this.usersService.changeSocketId({socketId: client.id, userId: userId})
            await this.usersService.changeConnected({userId: userId, connected: true})
        }
    }

    async handleDisconnect(@ConnectedSocket() client: any){
        const userId = client.handshake.query['user_id'];

        await this.usersService.changeConnected({userId: userId, connected: false})
        client.disconnect(0)
    }

    @SubscribeMessage("friend_request")
    async handleFriendRequest(@MessageBody() dto: FriendRequestDto){
        if(dto.to === dto.from) return null

        const toUser = await this.usersService.getUser(dto.to)
        const fromUser = await this.usersService.getUser(dto.from)

        await this.usersService.createFriendRequest({toUserId: toUser.id, fromUserId: fromUser.id})

        const notification = await this.notificationsService.createNotifications({
            userId: toUser.id,
            senderId: fromUser.id,
            content: `Вам отправил приглашения в друзья пользователь с именем - ${fromUser.name}`
        })


        this.server.to(fromUser.socket_id).emit("new_friend_req", {
            message: `Вы отправили приглашение в друзья ${toUser.name}`
        })

        this.server.to(toUser.socket_id).emit("new_friend_req", {
            message: `Вам отправил приглашения в друзья пользователь с именем - ${fromUser.name}`,
            notification: notification
        })
    }

    @SubscribeMessage("accept_friend_request")
    async handleAcceptFriendRequest(@MessageBody() dto: AcceptFriendRequestDto){
        const request_doc = await this.usersService.getFriendRequest(dto.idFriendRequest)

        const sender = await this.usersService.getUser(request_doc.senderId)
        const receiver = await this.usersService.getUser(request_doc.recipientId)

        await this.usersService.addFriends({addUserId: receiver.id, userId: sender.id})
        await this.usersService.addFriends({addUserId: sender.id, userId: receiver.id})

        await this.usersService.deleteFriendRequest(receiver.id, sender.id);

        const notification = await this.notificationsService.createNotifications({
            userId: sender.id,
            senderId: receiver.id,
            content: `Пользователь ${receiver.name} принял запрос на дружбу`
        })

        this.server.to(sender.socket_id).emit("request_accepted", {
            message: `Пользователь ${receiver.name} принял запрос на дружбу`,
            notification: notification
        })
        this.server.to(receiver.socket_id).emit("request_accepted", {
            message: `Вы приняли запрос дружбы от ${sender.name}`
        })
    }

    @SubscribeMessage('cancellation_add_friend')
    async handlerCancellationAddFriend(@MessageBody() dto: AcceptFriendRequestDto){
        const request_doc = await this.usersService.getFriendRequest(dto.idFriendRequest)

        const sender = await this.usersService.getUser(request_doc.senderId)
        const receiver = await this.usersService.getUser(request_doc.recipientId)

        await this.usersService.deleteFriendRequest(receiver.id, sender.id);

        const notification = await this.notificationsService.createNotifications({
            userId: sender.id,
            senderId: receiver.id,
            content: `Пользователь ${receiver.name} не принял запрос на дружбу`
        })

        this.server.to(sender.socket_id).emit("friend_cancellation", {
            message: `Пользователь ${receiver.name} не принял запрос на дружбу`,
            notification: notification
        })

        this.server.to(receiver.socket_id).emit("friend_cancellation", {
            message: `Вы не приняли запрос дружбы от ${sender.name}`
        })
    }

    @SubscribeMessage('cancellation_friend_request')
    async handlerCancellationFriendRequest(@MessageBody() dto: AcceptFriendRequestDto){
        const request_doc = await this.usersService.getFriendRequest(dto.idFriendRequest)

        const sender = await this.usersService.getUser(request_doc.senderId)
        const receiver = await this.usersService.getUser(request_doc.recipientId)

        await this.usersService.deleteFriendRequest(receiver.id, sender.id);

        const notification = await this.notificationsService.createNotifications({
            userId: receiver.id,
            senderId: sender.id,
            content: `Вы не успели ответить на запрос дружбы от пользователя ${sender.name}`
        })

        this.server.to(sender.socket_id).emit("request_cancellation", {
            message: `Вы отменили свой запрос на дружбу для ${receiver.name}`
        })

        this.server.to(receiver.socket_id).emit("request_cancellation", {
            message: `Вы не успели ответить на запрос дружбы от пользователя ${sender.name}`,
            notification: notification
        })
    }
}