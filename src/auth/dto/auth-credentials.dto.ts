import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}