import request from 'supertest';
import server from '../../';

/**
 * mockRoute(arg1, arg2, arg3)
 *
 * Helper function for mocking endpoints
 * with fake user data.
 *
 * @param {String} endpoint - The endpoint being tested.
 * @param {String} route - The full endpoint for supertest to make a request on.
 * @param {Object} user - Fake user object.
 * @param {Object} data - The mock req.data object.
 * @returns {Object} res - Response Object.
 */
export const mockRoute = (endpoint, route, user, data) => {
  switch (endpoint) {
    case '/sign-up':
      return request(server).post(route).send(data);
    case '/sign-in':
      return request(server).post(route).send(data);
    case '/new-note':
      return request(server).post(route).set('Authorization', `JWT ${user.createToken()}`).send(data);
    case '/edit-note': return null;
    case '/delete-note': return null;
    case '/get-note': return null;
    case '/get-notes': return null;
    case '*': return request(server).get(route);
    default: return 'Oops you screwed something up!';
  }
}
