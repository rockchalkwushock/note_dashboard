import passport from 'passport';

import jwtLogin from './jwtStrategy';
import localLogin from './localStrategy';

passport.use(jwtLogin);
passport.use(localLogin);

export const authJwt = passport.authenticate('jwt', { session: false });
export const authLocal = passport.authenticate('local', { session: false });
