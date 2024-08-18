import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { use } from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "src/domain/interfaces/ijwtpayload";
import { User } from "src/domain/models/user.entity";
import { UserRepository } from "src/infrastructure/dataAccess/repository/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    readonly _userRepository: UserRepository;

    constructor(userRepository: UserRepository, configService: ConfigService){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this._userRepository = userRepository;
    }

    async validate(payload: IJwtPayload): Promise<User>{
        const { username } = payload;

        const user = await this._userRepository.findOneBy({login: username});
        if(!user)
            throw new UnauthorizedException();

        return user;
    }
}