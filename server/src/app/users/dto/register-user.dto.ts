import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class RegisterUserDto {

    @ApiProperty({ example: "email@mail.ru", description: "Почтовый ящик" })
    @IsString({ message: "Должно быть строкой" })
    @IsEmail({}, { message: "Некорректный email" })
    readonly email: string;

    @ApiProperty({ example: "********", description: "Пароль" })
    @IsString({ message: "Должно быть строкой" })
    @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
    readonly password: string;

    @ApiProperty({ example: "Олег", description: "Имя" })
    @IsString({ message: "Должно быть строкой" })
    @Length(4, 16, { message: "Не меньше 4 и не больше 16" })
    readonly name: string;

    @ApiProperty({ example: "Красный", description: "Цвет" })
    readonly imgSubstitute?: string;
}