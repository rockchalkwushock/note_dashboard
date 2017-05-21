/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, UserFactory } from '../../__mocks__';
import { User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/users`;
let testUser;

describe('POST: /users/sign-up', () => {
  /**
   * Before test suite begins testing the code base
   * remove all the 'users' from the database.
   * Instantiate a testUser for assertions.
   */
  beforeAll(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });
  test('Returns status of 201', async () => {
    // Tell Jest how many assertion tests it should expect
    // Good way to validate all the async tests are being
    // executed.
    // https://facebook.github.io/jest/docs/en/expect.html#expectassertionsnumber
    expect.assertions(3);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, UserFactory.generate());
      expect(status).toEqual(201);
      expect(body).toHaveProperty('_id');
      expect(body).toHaveProperty('token');
    } catch (e) { throw e; };
  });
  test('Registering an existing user returns status of 400', async () => {
    expect.assertions(3);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, { email: testUser.email, password: 'password1' });
      expect(status).toEqual(400);
      expect(body.message).toEqual('users validation failed');
      expect(body.errors.email).toEqual(`${testUser.email} already taken!`);
    } catch (e) { throw e; };
  });
  test('No Email returns status of 400', async () => {
    expect.assertions(2);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, { password: 'password1' });
      expect(status).toEqual(400);
      expect(body.message).toEqual('validation error');
    } catch (e) { throw e; };
  });
  test('No Password returns status of 400', async () => {
    expect.assertions(2);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, { email: testUser.email });
      expect(status).toEqual(400);
      expect(body.message).toEqual('validation error');
    } catch (e) { throw e; };
  });
  test('Invalid Email returns status of 400', async () => {
    expect.assertions(3);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, { email: 'user@test', password: 'password1' });
      expect(status).toEqual(400);
      expect(body.message).toEqual('users validation failed');
      expect(body.errors.email).toEqual('user@test is not a valid email!');
    } catch (e) { throw e; };
  });
  test('Improper length on password returns status of 400', async () => {
    expect.assertions(2);
    try {
      const { body, status } = await mockRoute('signup', `${ROOT}/sign-up`, null, { email: '123@test.com', password: 'pas' });
      expect(status).toEqual(400);
      expect(body.message).toEqual('validation error');
    } catch (e) { throw e; };
  });
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
