import {forwardRef, Module} from '@nestjs/common';
import { DialogsService } from './dialogs.service';
import { DialogsController } from './dialogs.controller';
import {AuthModule} from "../auth/auth.module";
import {UsersService} from "../users/users.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/models/users.model";
import {Role} from "../roles/roles.model";
import {FriendRequest} from "../users/models/friendRequest.model";
import {Dialog} from "./dialogs.model";
import {RolesService} from "../roles/roles.service";
import {UserDialog} from "./user-dialogs.model";
import {Message} from "../messages/models/messages.model";
import {MessageReadStatus} from "../messages/models/messagesReadStatus.model";
import {MessagesService} from "../messages/messages.service";

@Module({
  controllers: [DialogsController],
  providers: [DialogsService, UsersService, RolesService, MessagesService],
  imports: [
      SequelizeModule.forFeature([User, Dialog, FriendRequest, UserDialog, Role, Message, MessageReadStatus]),
      forwardRef(() => AuthModule)
  ],
  exports: [UsersService]
})
export class DialogsModule {}
