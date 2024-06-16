import {User} from "../../users/models/users.model";

export class CreateMessageDto{
    readonly content: string[];
    readonly dialogId: number;
    readonly userId: number;
    readonly status?: string;
}

export class CreateMessageReadStatusDto{
    readonly participants: User[];
    readonly messageId: number;
    readonly userId: number;
    readonly dialogId: number;
}