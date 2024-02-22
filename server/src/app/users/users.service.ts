 import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./models/users.model";
import { InjectModel } from "@nestjs/sequelize";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
 import {ChangeSocketId} from "./dto/change-socketId";
 import {FriendRequest} from "./models/friendRequest.model";
 import {CreateFriendRequestDto} from "./dto/create-friendRequest.dto";
 import {AddFriendsDto} from "./dto/add-friends.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              @InjectModel(FriendRequest) private friendRequestRepository: typeof FriendRequest,
              private roleService: RolesService) {
  }

  // Создание пользователя
  async postCreateUser(dto: RegisterUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set("roles", [role.id]);
    user.roles = [role];
    return user;
  }

  // Получение всех пользователей
  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true }});
  }

  // Получение пользователя по id
  async getUser(id: number) {
    return await this.userRepository.findOne({ attributes: [ 'name', 'email', 'banned', 'banReason', 'id', 'imgSubstitute', 'socket_id', 'friends'], where: { id: id }, include: { all: true } });
  }

  // Получение пользователя по id
  async getUserBySocketId(id: string) {
    return await this.userRepository.findOne({ attributes: [ 'name', 'email', 'banned', 'banReason', 'id', 'imgSubstitute', 'socket_id', 'friends' ], where: { socket_id: id }, include: { all: true } });
  }

  // Удаление пользователя по id
  async deleteUser(dto: DeleteUserDto) {
    return await this.userRepository.destroy({
      where: {
        id: dto.id
      }
    });
  }

  // Получение пользователя по email
  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  // Добавление роли
  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add("role", role.id);
      return dto;
    }
    throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
  }

  // Бан пользователя
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  // Изменение socketId
  async changeSocketId(dto: ChangeSocketId){
    const post = await this.userRepository.findOne({where: {id: dto.userId}})
    if(!post.socket_id) await post.update({socket_id: dto.socketId})
  }

  // Получение друзей
  async getFriends(dto: number){
    const user = await this.userRepository.findByPk(dto)
    return user.friends.map(async id => await this.userRepository.findByPk(id))
  }

  // Добавление друзей
  async addFriends(dto: AddFriendsDto){
    const user = await this.userRepository.findByPk(dto.userId);
    if(!user.friends.includes(dto.addUserId)) await user.update({friends: [...user.friends, dto.addUserId]})
  }

  // Получение friend request по id
  async getFriendRequest(friendRequestId: number){
    return await this.friendRequestRepository.findByPk(friendRequestId)
  }

  // Удаление friend request по id
  async deleteFriendRequest(id: number){
    await this.friendRequestRepository.destroy({where: {id: id}})
  }

  // Получение всех friend requests
  async getFriendRequests(recipientId: string){
      return await this.friendRequestRepository.findAll({where: {recipientId: recipientId}})
  }

  // Создание friends requests
  async createFriendRequest(dto: CreateFriendRequestDto){
    const friendRequest = await this.friendRequestRepository.findOne({where: {senderId: dto.fromUserId, recipientId: dto.toUserId}})
    if(!friendRequest) await this.friendRequestRepository.create({senderId: dto.fromUserId, recipientId: dto.toUserId})
  }
}
