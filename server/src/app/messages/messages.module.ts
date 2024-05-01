import {forwardRef, Module} from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Message} from "./models/messages.model";
import {AuthModule} from "../auth/auth.module";
import {MessagesRealtimeService} from "./messages.realtime.service";
import {DialogsService} from "../dialogs/dialogs.service";
import {Dialog} from "../dialogs/dialogs.model";
import {User} from "../users/models/users.model";
import {UserDialog} from "../dialogs/user-dialogs.model";
import {MessageReadStatus} from "./models/messagesReadStatus.model";
import {UsersService} from "../users/users.service";
import {FriendRequestService} from "../users/sockets/friendRequest/friendRequest.service";
import {FriendRequest} from "../users/models/friendRequest.model";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRealtimeService, DialogsService, UsersService, RolesService],
  imports: [
      SequelizeModule.forFeature([Message, Dialog, User, UserDialog, MessageReadStatus, FriendRequest, Role]),
      forwardRef(() => AuthModule),
  ],
    exports: [MessagesRealtimeService]
})
export class MessagesModule {}
