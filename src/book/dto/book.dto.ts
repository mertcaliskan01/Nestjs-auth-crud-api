import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsBoolean()
    @ApiProperty()
    published: boolean;
}