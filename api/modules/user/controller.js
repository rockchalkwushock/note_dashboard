import HTTPStatus from 'http-status';
import User from './model';
import { config } from '../../configs';
import { filterBody } from '../../utils';

/**
 * @api {post} /users/sign-up Create a user.
 * @apiDescription Create an authenticated user in the database.
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User's email.
 * @apiParam (Body) {String} password User's password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User's _id in database.
 * @apiSuccess {String} token JWT Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *
 * HTTP/1.1 400 Bad Request
 *
 * {
 *  email: 'email is required',
 * }
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

/**
 * @api {post} /users/sign-in Authenticate User.
 * @apiDescription Authenticate user against database.
 * @apiName signinUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User's email.
 * @apiParam (Body) {String} password User's password.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User's _id in database.
 * @apiSuccess {String} token JWT Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *
 * HTTP/1.1 400 Bad Request
 *
 * {
 *  email: 'email is required',
 * }
 */
export const signIn = async (req, res, next) => {
  res.status(HTTPStatus.OK).json(req.user.toAuthJSON());
  return next();
}
