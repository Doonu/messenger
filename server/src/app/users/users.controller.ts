import {Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards} from "@nestjs/common";
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
import {ExceptFriendsDto} from "./dto/exceptFriends.dto";
import {GetAllUsersExceptionsDto} from "./dto/getAll-usersExceptions.dto";

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

  @ApiOperation({ summary: "Получение всех пользователей кроме друзей" })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Post("/usersExceptFriends")
  getAllExceptFriends(@Req() {userId}: any, @Body() { search, page }: ExceptFriendsDto){
    return this.userService.getAllUsersExceptFriends(userId, search, page)
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
  @Get("/allFriends/:id")
  getAllFriends(@Param("id") id: number){
    return this.userService.getAllFriends(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/allUsersExceptions")
  getAllUsersExceptions(
      @Req() {userId}: any,
      @Body() dto: GetAllUsersExceptionsDto
  ){
    return this.userService.getAllUsersExceptExceptions(userId, dto.search, dto.page, dto.exceptions);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/friends/:id")
  getFriends(
      @Param("id") id: number,
      @Query("page") page: number,
      @Query('search') search: string
  ){
    return this.userService.getFriends(id, page, search);
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
  @UseGuards(JwtAuthGuard)
  getPossibleFriends(@Param("id") userId: number){
    return this.userService.getPossibleFriends(userId)
  }
}
