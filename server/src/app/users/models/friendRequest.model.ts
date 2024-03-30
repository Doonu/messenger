import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "./users.model";

interface FriendRequestCreationAttrs{
    senderId: number;
    recipientId: number;
}

@Table({tableName: 'friendRequest'})
export class FriendRequest extends Model<FriendRequest, FriendRequestCreationAttrs>{

    @ApiProperty({ example: 1, description: "Уникальный индификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @ApiProperty({ example: 132, description: "Уникальный индификатор отправилтеля" })
    @Column({type: DataType.INTEGER})
    senderId: number;

    @ApiProperty({ example: 112, description: "Уникальный индификатор получателя" })
    @Column({type: DataType.INTEGER})
    recipientId: number;

    @BelongsTo(() => User)
    sender: User;
}