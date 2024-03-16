import {forwardRef, Module} from '@nestjs/common';
import {NotificationsService} from "./notifications.service";
import {NotificationsController} from "./notifications.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Notifications} from "./notifications.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [NotificationsController],
    providers: [NotificationsService],
    imports: [
        SequelizeModule.forFeature([Notifications]),
        forwardRef(() => UsersModule),
        forwardRef(() => AuthModule)
    ],
    exports: [NotificationsService]
})
export class NotificationsModule {}
