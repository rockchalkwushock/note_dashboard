import LocalStrategy from 'passport-local';

import { User } from '../../modules';

const localOpts = { usernameField: 'email' };

export default new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    // Look up user in database by email.
    const user = await User.findOne({ email });
    if (!user) {
      // No user in database with email.
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      // Password incorrect.
      return done(null, false);
    }
    // Success: return user object { _id: '', token: '' }.
    return done(null, user);
  } catch (e) { return done(e, false); }
});
