import request from 'supertest';
import server from '../../';

/**
 * mockRoute(arg1, arg2, arg3)
 *
 * Helper function for mocking endpoints
 * with fake user data.
 *
 * @param {String} action - The action being tested.
 * @param {String} route - The full endpoint for supertest to make a request on.
 * @param {Object} user - Fake user object.
 * @param {Object} data - The mock req.data object.
 * @returns {Object} res - Response Object.
 */
export const mockRoute = (action, route, user, data) => {
  switch (action) {
    case 'signup':
      return request(server).post(route).send(data);
    case 'signin':
      return request(server).post(route).send(data);
    case 'create-note':
      return request(server).post(route).set('Authorization', `JWT ${user.createToken()}`).send(data);
    case 'update-note':
      return request(server).patch(route).set('Authorization', `JWT ${user.createToken()}`).send(data);
    case 'delete-note':
      return request(server).delete(route).set('Authorization', `JWT ${user.createToken()}`);
    case 'get-note':
      return request(server).get(route).set('Authorization', `JWT ${user.createToken()}`);
    case 'get-notes':
      return request(server).get(route).set('Authorization', `JWT ${user.createToken()}`);
    case 'invalid-jwt-post':
      return request(server).post(route).set('Authorization', 'JWT maliciousEntry').send(data);
    case 'invalid-jwt-patch':
      return request(server).patch(route).set('Authorization', 'JWT maliciousEntry').send(data);
    case 'invalid-jwt-delete':
      return request(server).delete(route).set('Authorization', 'JWT maliciousEntry');
    case 'invalid-jwt-get':
      return request(server).get(route).set('Authorization', 'JWT maliciousEntry');
    case '*': return request(server).get(route);
    default: return 'Oops you screwed something up!';
  }
}
