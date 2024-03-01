import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from "@nestjs/websockets";
import {UsersService} from "../../users/users.service";
import {FriendRequestDto} from "./dto/friend-request.dto";
import {AcceptFriendRequestDto} from "../../users/dto/accept-friend-request.dto";
import { Server } from "socket.io";

@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000'],
    }
})
export class FriendRequestService implements OnGatewayConnection{
    constructor(private usersService: UsersService) {
    }

    @WebSocketServer() server: Server;

    async handleConnection(@ConnectedSocket() client: any) {
        const userId = client.handshake.query['user_id'];
        console.log(userId)

        if(userId){
            await this.usersService.changeSocketId({socketId: client.id, userId: userId})
        }
    }

    @SubscribeMessage("friend_request")
    async handleFriendRequest(@MessageBody() dto: FriendRequestDto, @ConnectedSocket() client: any){
        if(dto.to === dto.from) return null

        const toUser = await this.usersService.getUser(dto.to)
        const fromUser = await this.usersService.getUser(dto.from)

        await this.usersService.createFriendRequest({toUserId: toUser.id, fromUserId: fromUser.id})

        this.server.to(fromUser.socket_id).emit("new_friend_req", {
            message: `Вы отправили приглашение в друзья ${toUser.name}`,
            id: toUser.id,
        })

        this.server.to(toUser.socket_id).emit("new_friend_req", {
            message: `Вам отправил приглашения в друзья пользователь с именем - ${fromUser.name}`
        })
    }

    @SubscribeMessage("accept_friend_request")
    async handleAcceptFriendRequest(
        @MessageBody() dto: AcceptFriendRequestDto, @ConnectedSocket() client: any
    ){
        const request_doc = await this.usersService.getFriendRequest(dto.idFriendRequest)

        const sender = await this.usersService.getUser(request_doc.senderId)
        const receiver = await this.usersService.getUser(request_doc.recipientId)

        await this.usersService.addFriends({addUserId: receiver.id, userId: sender.id})
        await this.usersService.addFriends({addUserId: sender.id, userId: receiver.id})

        await this.usersService.deleteFriendRequest(dto.idFriendRequest);

        this.server.to(sender.socket_id).emit("request_accepted", {
            message: `Пользователь ${receiver.name} принял запрос на дружбу`
        })
        this.server.to(receiver.socket_id).emit("request_accepted", {
            message: `Вы приняли запрос дружбы от ${sender.name}`
        })
    }

    // @SubscribeMessage("end_friend_request")
    // async handleDisconnect(@ConnectedSocket() client: any){
    //     console.log("Closing connection")
    //     client.disconnect(0)
    // }
}