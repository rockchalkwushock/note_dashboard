import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { User } from '../../modules';
import config from '../../configs/configuration' // TODO: WHY!?!?! WTF!?!?

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: config.JWT_SECRET,
};

export default new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    // Look up user by the _id in the database.
    const user = await User.findById(payload._id);
    // No user exists.
    if (!user) { return done(null, false); }
    // Success: return user object { _id: '', token: '' }.
    return done(null, user);
  } catch (e) { return done(e, false); }
});
