import { Injectable, UnauthorizedException, BadRequestException, ArgumentsHost } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, } from './user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async createUser(authCredentialsDto: RegisterCredentialsDto) {

        let userToAttempt = await this.findOneByEmail(authCredentialsDto.email);
        if (!userToAttempt) {
            const newUser = new this.userModel({
                email: authCredentialsDto.email,
                password: authCredentialsDto.password,
                first_name: authCredentialsDto.first_name,
                last_name: authCredentialsDto.last_name,

            });
            return await newUser.save().then((user) => {
                return user.toObject({ versionKey: false });
            });
        } else {
            return new BadRequestException('Email already exist!');
        }
    }

    async validateUserByPassword(authCredentialsDto: LoginCredentialsDto) {
        let userToAttempt: any = await this.findOneByEmail(authCredentialsDto.email);
        if (!userToAttempt) throw new BadRequestException('Email not found !');
        return new Promise((resolve, reject) => {
            userToAttempt.checkPassword(authCredentialsDto.password, (err, isMatch) => {
                if (err) {
                    reject(new UnauthorizedException());
                }
                if (isMatch) {
                    const payload: any = {
                        token: this.createJwtPayload(userToAttempt),
                        firstName: userToAttempt.first_name ,
                        lastName: userToAttempt.last_name,
                        email: userToAttempt.email,
                    }
                    resolve(payload);
                } else {
                    reject(new BadRequestException(`Password don't match`));
                }
            });
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({ email: email });
    }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async getUser(authCredentialsDto: AuthCredentialsDto) {
        const userInfo = this.verifyJwtPayload(authCredentialsDto.token);
        let userToAttempt: any = await this.findOneByEmail(userInfo.email);
        return await userToAttempt;
    }


    async validateUserByJwt(payload: JwtPayload) {
        let user = await this.findOneByEmail(payload.email);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            _id: user._id,
            email: user.email
        };
        return this.jwtService.sign(data);
    }



    verifyJwtPayload(token) {
        try {
          return this.jwtService.verify(token);
        } catch (error) {
          // Hata işleme kodunu buraya ekleyin
          console.error("Jwt verification error:", error);
          throw new Error("Jwt verification failed"); // Opsiyonel olarak hata yeniden fırlatılabilir
        }
      }

}

