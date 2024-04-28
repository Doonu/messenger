import {forwardRef, Module} from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Message} from "./messages.model";
import {AuthModule} from "../auth/auth.module";
import {MessagesRealtimeService} from "./messages.realtime.service";
import {DialogsService} from "../dialogs/dialogs.service";
import {DialogsModule} from "../dialogs/dialogs.module";
import {Dialog} from "../dialogs/dialogs.model";
import {User} from "../users/models/users.model";
import {UserDialog} from "../dialogs/user-dialogs.model";

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRealtimeService, DialogsService],
  imports: [
      SequelizeModule.forFeature([Message, Dialog, User, UserDialog]),
      forwardRef(() => AuthModule)
  ],
    exports: [MessagesRealtimeService]
})
export class MessagesModule {}
