import {User} from "../app/users/models/users.model";

export interface IUserPossibleFriendsResponse{
    countPossibleFriends: number[];
    user: User;
}