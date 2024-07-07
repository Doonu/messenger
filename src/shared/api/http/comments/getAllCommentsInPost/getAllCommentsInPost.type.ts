export interface IGetAllCommentsInPost {
  postId: number;
  orderBy: string;
  orderDirection: number;
  page: number;
  limit: number;
}
