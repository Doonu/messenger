import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

interface FriendRequestCreationAttrs{
    senderId: string;
    recipientId: string;
}

@Table({tableName: 'friendRequest'})
export class FriendRequest extends Model<FriendRequest, FriendRequestCreationAttrs>{

    @ApiProperty({ example: 1, description: "Уникальный индификатор" })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: "1", description: "Уникальный индификатор отправилтеля" })
    @Column({type: DataType.STRING})
    senderId: string;

    @ApiProperty({ example: "1", description: "Уникальный индификатор получателя" })
    @Column({type: DataType.STRING})
    recipientId: string;
}