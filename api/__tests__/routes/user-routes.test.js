/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, UserFactory } from '../../__mocks__';
import { User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/users`;
const endPoint1 = '/sign-in';
const endPoint2 = '/sign-up';
let testUser;

describe('User Module Routes', () => {
  // Before the test suite begins testing the code base
  // Remove any 'users' from the database.
  // Instantiate a testUser to use throughout the tests.
  beforeAll(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });
  describe(`POST: ${endPoint1}`, () => {
    describe('SUCCESSFUL REQUEST', () => {
      test('Signing in returns a status of 200', async () => {
        expect.assertions(3);
        try {
          const { body, status } = await mockRoute(`${endPoint1}`, `${ROOT}${endPoint1}`, { email: testUser.email, password: 'password1' });
          expect(status).toEqual(200);
          expect(body._id).toEqual(testUser._id.toString());
          expect(body).toHaveProperty('token');
        } catch (e) { throw e; }
      });
    });
    describe('FAILED REQUEST', () => {
      test('Improper credentials returns status of 401', async () => {
        expect.assertions(2);
        try {
          const { status, text } = await mockRoute(`${endPoint1}`, `${ROOT}${endPoint1}`, { email: testUser.email, password: 'cheating' });
          expect(status).toEqual(401);
          expect(text).toEqual('Unauthorized');
        } catch (e) { throw e; }
      })
    })
  });
  describe(`POST: ${endPoint2}`, () => {
    describe('SUCCESSFUL REQUEST', () => {
      test('Returns status of 201', async () => {
        // Tell Jest how many assertion tests it should expect
        // Good way to validate all the async tests are being
        // executed.
        // https://facebook.github.io/jest/docs/en/expect.html#expectassertionsnumber
        expect.assertions(3);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, UserFactory.generate());
          expect(status).toEqual(201);
          expect(body).toHaveProperty('_id');
          expect(body).toHaveProperty('token');
        } catch (e) { throw e; };
      });
    });
    describe('FAILED REQUEST', () => {
      test('Registering an existing user returns status of 400', async () => {
        expect.assertions(3);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, { email: testUser.email, password: 'password1' });
          expect(status).toEqual(400);
          expect(body.message).toEqual('users validation failed');
          expect(body.errors.email).toEqual(`${testUser.email} already taken!`);
        } catch (e) { throw e; };
      })
      test('No Email returns status of 400', async () => {
        expect.assertions(2);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, { password: 'password1' });
          expect(status).toEqual(400);
          expect(body.message).toEqual('validation error');
        } catch (e) { throw e; };
      });
      test('No Password returns status of 400', async () => {
        expect.assertions(2);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, { email: testUser.email });
          expect(status).toEqual(400);
          expect(body.message).toEqual('validation error');
        } catch (e) { throw e; };
      });
      test('Invalid Email returns status of 400', async () => {
        expect.assertions(3);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, { email: 'user@test', password: 'password1' });
          expect(status).toEqual(400);
          expect(body.message).toEqual('users validation failed');
          expect(body.errors.email).toEqual('user@test is not a valid email!');
        } catch (e) { throw e; };
      })
      test('Improper length on password returns status of 400', async () => {
        expect.assertions(2);
        try {
          const { body, status } = await mockRoute(`${endPoint2}`, `${ROOT}${endPoint2}`, { email: '123@test.com', password: 'pas' });
          expect(status).toEqual(400);
          expect(body.message).toEqual('validation error');
        } catch (e) { throw e; };
      })
    });
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


