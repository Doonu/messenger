import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/models/users.model";

interface NotificationsModelAttrs{
    userId: number;
    senderId: number;
    content: string;
}

@Table({tableName: 'notifications'})
export class Notifications extends Model<Notifications, NotificationsModelAttrs>{
    @ApiProperty({ example: 1, description: "Уникальный индификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type:DataType.TEXT, allowNull: false })
    content: string;

    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    senderId: number

    @BelongsTo(() => User)
    sender: User;
}