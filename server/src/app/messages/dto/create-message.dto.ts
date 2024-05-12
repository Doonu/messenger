import {User} from "../../users/models/users.model";

export class CreateMessageDto{
    readonly content: string[];
    readonly dialogId: number;
    readonly userId: number;
}

export class CreateMessageReadStatusDto{
    readonly participants: User[];
    readonly messageId: number;
    readonly userId: number;
    readonly dialogId: number;
}