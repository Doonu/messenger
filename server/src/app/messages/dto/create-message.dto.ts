export class CreateMessageDto{
    readonly content: string[];
    readonly dialogId: number;
    readonly userId: number;
}