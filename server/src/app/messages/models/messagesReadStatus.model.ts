import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../../users/models/users.model";
import {Message} from "./messages.model";
import {Dialog} from "../../dialogs/dialogs.model";

interface IMessageReadStatus{
    messageId: number;
    userId: number;
    readStatus: boolean;
    dialogId: number;
}

@Table({tableName: 'message_readStatus'})
export class MessageReadStatus extends Model<MessageReadStatus, IMessageReadStatus>{
    @Column({type: DataType.INTEGER, unique: true,  autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    readStatus: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Dialog)
    @Column({type: DataType.INTEGER})
    dialogId: number;

    @ForeignKey(() => Message)
    @Column({type: DataType.INTEGER})
    messageId: number;
}