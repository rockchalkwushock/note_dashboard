import HTTPStatus from 'http-status';
import User from './model';
import { config } from '../../configs';
import { filterBody } from '../../utils';

/**
 * signUp(arg1, arg2, arg3)
 *
 * Controller for creating an authenticated user.
 *
 * @param {Object} req - data sent by user.
 * @param {Object} res - response object from server.
 * @param {Function}  next - prototype telling generator to continue or not.
 * @returns {Object} res = response object holding user or error message.
 */
export const signUp = async (req, res, next) => {
  // Sanitize the provided data from user against Whitelist.
  const filteredBody = filterBody(req.body, config.WHITELIST.users.signUp);
  try {
    // Create a new authenticated user in the database.
    const user = await User.create(filteredBody);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
