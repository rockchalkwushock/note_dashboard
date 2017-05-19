/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, UserFactory } from '../../__mocks__';
import { User } from '../../modules';
import { config } from '../../utils';
import server from '../../index';

// Store endpoint that will be tested.
const endpoint = `${config.ENDPOINT}/users/sign-up`
let testUser;

describe('POST: /sign-up', () => {
  // Before the test suite begins testing the code base
  // Remove any 'users' from the database.
  // Instantiate a testUser to use throughout the tests.
  beforeAll(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });
  describe('SUCCESSFUL REQUEST TEST CASES', () => {
    test('Returns status of 201', async () => {
      // Tell Jest how many assertion tests it should expect
      // Good way to validate all the async tests are being
      // executed.
      // https://facebook.github.io/jest/docs/en/expect.html#expectassertionsnumber
      expect.assertions(1);
      try {
        const { status } = await mockRoute('/sign-up', endpoint, UserFactory.generate());
        expect(status).toEqual(201);
      } catch (e) { throw e; };
    });
    test('Returns user object', async () => {
      expect.assertions(2);
      try {
        const { body } = await mockRoute('/sign-up', endpoint, UserFactory.generate());
        expect(body).toHaveProperty('_id');
        expect(body).toHaveProperty('token');
      } catch (e) { throw e; };
    });
  });
  describe('FAILED REQUEST TEST CASES', () => {
    test.skip('No Email returns status of 400', async () => {
      expect.assertions(1);
      try {
        const { status } = await mockRoute(endpoint, { password: 'password1' });
        expect(status).toEqual(400);
      } catch (e) { throw e; };
    });
    test.skip('No Password returns status of 400', async () => {
      expect.assertions(1);
      try {
        const { status } = await mockRoute(endpoint, { email: testUser.email });
        expect(status).toEqual(400);
      } catch (e) { throw e; };
    });
    test.skip('Invalid Email returns status of 400', async () => {
      expect.assertions(1);
      try {
        const { status } = await mockRoute(endpoint, { email: 'user@test', password: 'userPassword' });
        expect(status).toEqual(400);
      } catch (e) { throw e; }
    })
  });
  // After all tests have completed teardown
  // database & server so Jest can exit.
  afterAll(async () => {
    const { users } = mongoose.connection.collections;
    try {
      await users.drop(); // drop the users collection
      await mongoose.disconnect(); // close connection to MongoDB
      await server.close(); // close server connection
    } catch (e) { throw e; };
  });
});
