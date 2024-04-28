import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/users.model";
import { Role } from "../roles/roles.model";
import { UserRoles } from "../roles/user-roles.model";
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Comments } from "../comments/comments.model";
import { FriendRequestService } from "./sockets/friendRequest/friendRequest.service";
import { FriendRequest } from "./models/friendRequest.model";
import { NotificationsModule } from "../notifications/notifications.module";
import {UserDialog} from "../dialogs/user-dialogs.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService, FriendRequestService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Comments, FriendRequest, UserDialog]),
    NotificationsModule,
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
    FriendRequestService
  ]
})
export class UsersModule {
}
