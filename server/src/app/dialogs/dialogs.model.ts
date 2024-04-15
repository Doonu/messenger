import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/models/users.model";
import {ApiProperty} from "@nestjs/swagger";
import {UserDialog} from "./user-dialogs.model";
import {Message} from "../messages/messages.model";

interface DialogsModel {
    dialogId: number;
    participants: User[];
    dialogName: string;
    isGroup: boolean;
    fixedMessage: Message;
}

@Table({tableName: 'dialogs'})
export class Dialog extends Model<Dialog, DialogsModel>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
    dialogName: string;

    @ApiProperty({example: 'Фото', description: 'Цвет аватарки'})
    @Column({ type: DataType.STRING, defaultValue: '#ff0000' })
    imgSubstitute: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    isGroup: boolean;

    @ForeignKey(() => Message)
    fixedMessageId: number;

    @BelongsTo(() => Message)
    fixedMessage: Message;

    @BelongsToMany(() => User, () => UserDialog)
    participants: User[];

    @HasMany(() => Message)
    messages: Message[]
}