import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway
} from "@nestjs/websockets";
import {UsersService} from "../../users/users.service";
import {FriendRequestDto} from "./dto/friend-request.dto";
import {AcceptFriendRequestDto} from "../../users/dto/accept-friend-request.dto";

@WebSocketGateway({
    cors: {
        origin: "*",
    }
})
export class FriendRequestService implements OnGatewayConnection{
    constructor(private usersService: UsersService) {
    }

    async handleConnection(@ConnectedSocket() client: any) {
        const userId = client.handshake.query['user_id'];

        if(userId){
            await this.usersService.changeSocketId({socketId: client.id, userId: userId})
        }
    }

    @SubscribeMessage("friend_request")
    async handleFriendRequest(@MessageBody() dto: FriendRequestDto, @ConnectedSocket() client: any){
        const toUser = await this.usersService.getUser(dto.to)
        const fromUser = await this.usersService.getUser(dto.from)

        await this.usersService.createFriendRequest({toUserId: toUser.socket_id, fromUserId: fromUser.socket_id})

        client.to(toUser.socket_id).emit("new_friend_req", {
            message: 'Создание friend request'
        })

        client.to(fromUser.socket_id).emit("new_friend_req", {
            message: 'Успешно доставлен'
        })
    }

    @SubscribeMessage("accept_friend_request")
    async handleAcceptFriendRequest(
        @MessageBody() dto: AcceptFriendRequestDto, @ConnectedSocket() client: any
    ){
        const request_doc = await this.usersService.getFriendRequest(dto.idFriendRequest)

        const sender = await this.usersService.getUserBySocketId(request_doc.senderId)
        const receiver = await this.usersService.getUserBySocketId(request_doc.recipientId)

        await this.usersService.addFriends({addUserId: receiver.id, userId: sender.id})
        await this.usersService.addFriends({addUserId: sender.id, userId: receiver.id})

        await this.usersService.deleteFriendRequest(dto.idFriendRequest);

        client.to(sender.socket_id).emit("request_accepted", {
            message: 'Подтвердил дружбу'
        })
        client.to(receiver.socket_id).emit("request_accepted", {
            message: 'Подтвердил дружбу'
        })
    }

    // @SubscribeMessage("end_friend_request")
    // async handleDisconnect(@ConnectedSocket() client: any){
    //     console.log("Closing connection")
    //     client.disconnect(0)
    // }
}