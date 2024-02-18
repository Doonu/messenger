export interface IFile{
    id: string;
    url: string;
    originalName: string;
    size: number;
    type: string;
}

export class CreatePostDto {
    readonly content: string[]
    readonly isDisabledComments: boolean
    readonly view: string;
    readonly files: IFile[];
    readonly status: number;
}