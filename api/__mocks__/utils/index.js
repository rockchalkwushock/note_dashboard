import request from 'supertest';
import server from '../../index';

/**
 * mockRoute(arg1, arg2)
 *
 * Helper function for mocking endpoints
 * with fake user data.
 *
 * @param {String} route The endpoint to be mocked.
 * @param {Object} data Generated fake user data.
 * @returns {Object} res Response object.
 */
 export const mockRoute = (route, data) => request(server).post(route).send(data);

