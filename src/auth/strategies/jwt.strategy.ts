import { Strategy as JwtStra, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../service/auth.service';
import { PayloadToken } from '../interfaces/auth.interface';
import { PassportUse } from '../../utils/passport.use';
import { JWT_SECRET } from '../../config/config';

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<JwtStra, StrategyOptions, (payload: PayloadToken, done: any) => Promise<PayloadToken>>(
      'jwt',
      JwtStra,
      { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
      this.validate,
    );
  }
}
