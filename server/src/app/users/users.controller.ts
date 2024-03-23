import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import { UsersService } from "./users.service";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./models/users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import {RegisterUserDto} from "./dto/register-user.dto";
import {IUserPossibleFriendsResponse} from "../../models/IUser";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @ApiOperation({ summary: "Получение одного пользователя по id" })
  @ApiResponse({ status: 200, type: User })
  @Get(":id")
  getByID(@Param("id") id: number) {
    return this.userService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/profile")
  getProfile(@Req() {userId}: any){
    return this.userService.getUser(userId);
  }

  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @ApiOperation({ summary: "Забанить пользователя" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.userService.banUser(dto);
  }

  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: RegisterUserDto) {
    return this.userService.postCreateUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Удаление пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Delete()
  delete(@Body() userDto: DeleteUserDto) {
    return this.userService.deleteUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/friends/:id")
  getFriends(@Param("id") id: number){
    return this.userService.getFriends(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/friends/:id")
  deleteFriend(@Req() {userId}: any, @Param("id") id: number){
    return this.userService.deleteFriend(userId, id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("/friendsAllRequests")
  getFriendsRequest(@Req() {userId}: any){
     return this.userService.getFriendRequests(userId);
  }

  @Get("/friendsRequest/:id")
  @UseGuards(JwtAuthGuard)
  getFriendRequest(@Req() {userId}: any, @Param("id") id: number){
    return this.userService.getFriendRequestByTwoID(userId, id)
  }

  @Get("/possibleFriends/:id")
  // @UseGuards(JwtAuthGuard)
  getPossibleFriends(@Param("id") userId: number){
    return this.userService.getPossibleFriends(userId)
  }
}
