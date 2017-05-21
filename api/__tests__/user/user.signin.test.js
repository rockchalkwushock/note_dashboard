/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, UserFactory } from '../../__mocks__';
import { User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/users`;
let testUser;

describe('POST: /users/sign-in', () => {
  /**
   * Before test suite begins testing the code base
   * remove all the 'users' from the database.
   * Instantiate a testUser for assertions.
   */
  beforeAll(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });
  test('Signing in returns a status of 200', async () => {
    expect.assertions(3);
    try {
      const { body, status } = await mockRoute('signin', `${ROOT}/sign-in`, null, { email: testUser.email, password: 'password1' });
      expect(status).toEqual(200);
      expect(body._id).toEqual(testUser._id.toString());
      expect(body).toHaveProperty('token');
    } catch (e) { throw e; }
  });
  test('Signing in when not a user returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('signin', `${ROOT}/sign-in`, null, { email: 'jabbaDaHutt@gmail.com', password: 'password1' });
      expect(status).toEqual(401);
      expect(text).toEqual('Unauthorized');
    } catch (e) { throw e; }
  })
  test('Improper credentials returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('signin', `${ROOT}/sign-in`, null, { email: testUser.email, password: 'cheating' });
      expect(status).toEqual(401);
      expect(text).toEqual('Unauthorized');
    } catch (e) { throw e; }
  })
  /**
   * After the test suite has completed:
   * 1. Drop user collection.
   * 2. Disconnect from the database.
   * 3. Close server connection.
   */
  afterAll(async () => {
    const { users } = mongoose.connection.collections;
    try {
      await users.drop(); // drop the users collection
      await mongoose.disconnect(); // close connection to MongoDB
      await server.close(); // close server connection
    } catch (e) { throw e; };
  });
})
