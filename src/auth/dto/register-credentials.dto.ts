import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCredentialsDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;
}