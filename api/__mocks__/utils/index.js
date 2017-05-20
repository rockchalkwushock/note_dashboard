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
 * @param {Object} data - The mock req.data object.
 * @returns {Object} res - Response Object.
 */
export const mockRoute = (endpoint, route, data) => {
  switch (endpoint) {
    case '/sign-up': return request(server).post(route).send(data);
    // TODO: Fill in the return value on the routes
    // as test suite grows.
    case '/sign-in': return request(server).post(route).send(data);
    case '/check-token': return null;
    case '/new-note': return null;
    case '/edit-note': return null;
    case '/delete-note': return null;
    case '/get-note': return null;
    case '/get-notes': return null;
    case '*': return request(server).get(route);
    default: return 'Oops you screwed something up!';
  }
}
