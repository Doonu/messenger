import { Module } from "@nestjs/common";
import { UsersModule } from "./app/users/users.module";
import * as process from "process";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./app/users/models/users.model";
import { RolesModule } from "./app/roles/roles.module";
import { Role } from "./app/roles/roles.model";
import { UserRoles } from "./app/roles/user-roles.model";
import { AuthModule } from "./app/auth/auth.module";
import { Post } from "./app/posts/posts.model";
import { FilesModule } from './app/files/files.module';
import {PostsModule} from "./app/posts/posts.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {CommentsModule} from "./app/comments/comments.module";
import {ConfigModule} from "@nestjs/config";
import {Comments} from "./app/comments/comments.model";
import { NotificationsModule } from './app/notifications/notifications.module';
import { DialogsModule } from './app/dialogs/dialogs.module';
import {UserDialog} from "./app/dialogs/user-dialogs.model";
import {Dialog} from "./app/dialogs/dialogs.model";
import { MessagesModule } from './app/messages/messages.module';
import {Message} from "./app/messages/models/messages.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/',
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, Comments, UserDialog, Dialog, Message],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    PostsModule,
    CommentsModule,
    NotificationsModule,
    DialogsModule,
    MessagesModule,
  ],
  exports: []
})
export class AppModule {
}
