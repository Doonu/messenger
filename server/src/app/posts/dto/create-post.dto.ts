export interface IFile {
    uid: number;
    name: string;
    url: string;
    size: number;
    type: string;
}

export class CreatePostDto {
    readonly content: string[]
    readonly isDisabledComments: boolean
    readonly view: string;
}
