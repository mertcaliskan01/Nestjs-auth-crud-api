import { Controller, Get, Post, Body, Put, ValidationPipe, Query, Req, Res, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'getAllUsers' })
  @Get('/getAllUsers')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @ApiOperation({ summary: 'getUser' })
  @Post('/getUser')
  async getUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return await this.authService.getUser(authCredentialsDto);
  }

  @ApiOperation({ summary: 'login' })
  @Post('/login')
  async signIn(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto) {
    return await this.authService.validateUserByPassword(loginCredentialsDto);
  }


  @ApiOperation({ summary: 'register' })
  @Post('/register')
  async signUp(@Body() authCredentialsDto: RegisterCredentialsDto) {
    return await this.authService.createUser(authCredentialsDto);
  }


/*
  @ApiOperation({ summary: 'user' })
  @Post('/user')
  async getUser(@Body() authCredentialsDto: RegisterCredentialsDto) {
    return await this.authService.getUser(authCredentialsDto);
  }*/


}
