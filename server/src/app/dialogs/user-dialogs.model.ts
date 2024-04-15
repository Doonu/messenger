import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/models/users.model";
import {ApiProperty} from "@nestjs/swagger";
import {Dialog} from "./dialogs.model";

@Table({ tableName: "user_dialogs", createdAt: false, updatedAt: false })
export class UserDialog extends Model<UserDialog> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Dialog)
    @Column({ type: DataType.INTEGER })
    dialogId: number;

    @ForeignKey(() => User)
    @ApiProperty({ example: "1", description: "Уникальный индификатор пользователя" })
    @Column({ type: DataType.INTEGER })
    userId: number;
}
