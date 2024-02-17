import {iFile} from "../../posts/dto/create-post.dto";

export class ToggleLikeCommentDto {
    readonly commentId: number
}

export class UpdateCommentDto{
    readonly content: string[]
    readonly commentId: number
}

export class UpdatePostDto{
    readonly content: string
    readonly id: number
    readonly isDisabledComments: boolean
    readonly view: string;
    readonly files: iFile[];
    readonly status: number;
}