/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, NoteFactory, UserFactory } from '../../__mocks__';
import { Note, User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/notes`;
let testUser;
let testUser2;
let testNote;
let testNote2;

describe('GET: /notes/', () => {
  /**
   * Before any tests are ran clear the database
   * of all notes & users.
   * Then populate testUsers & testNotes for assertions.
   */
  beforeAll(async () => {
    await Note.remove();
    await User.remove();
    testUser = await User.create(UserFactory.generate());
    testUser2 = await User.create(UserFactory.generate());
    testNote = await Note.create(NoteFactory.generate({ author: testUser._id }));
    testNote2 = await Note.create(NoteFactory.generate({ author: testUser._id }));
  });
  test('Fetching all notes returns a status of 200', async () => {
    expect.assertions(12);
    try {
      const { body, status } = await mockRoute('get-notes', `${ROOT}/`, testUser, null);
      expect(status).toEqual(200);
      expect(body.length).toEqual(2);
      expect(body[0].text).toEqual(testNote2.text);
      expect(body[0].author).not.toHaveProperty('password');
      expect(body[0].author).toHaveProperty('_id');
      expect(body[0]._id).toEqual(testNote2._id.toString());
      expect(body[0]).toHaveProperty('createdAt');
      expect(body[1].text).toEqual(testNote.text);
      expect(body[1].author).not.toHaveProperty('password');
      expect(body[1].author).toHaveProperty('_id');
      expect(body[1]._id).toEqual(testNote._id.toString());
      expect(body[1]).toHaveProperty('createdAt');
    } catch (e) { throw e; }
  });
  test('Invalid JWT returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('invalid-jwt-get', `${ROOT}/`, testUser, null);
      expect(status).toEqual(401);
      expect(text).toEqual('Unauthorized');
    } catch (e) { throw e; }
  });
  /**
   * After the test suite has completed:
   * 1. Drop both collections.
   * 2. Disconnect from the database.
   * 3. Close server connection.
   */
  afterAll(async () => {
    const { notes, users } = mongoose.connection.collections;
    try {
      await notes.drop(); // drop the notes collection
      await users.drop(); // drop the users collection
      await mongoose.disconnect(); // close connection to MongoDB
      await server.close(); // close server connection
    } catch (e) { throw e; };
  });
})
