/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, NoteFactory, UserFactory } from '../../__mocks__';
import { Note, User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/notes`;
let testUser;
let testNote;

describe('POST: /notes/', () => {
  /**
   * Before any tests are ran clear the database
   * of all notes & users.
   * Then populate testUsers & testNotes for assertions.
   */
  beforeAll(async () => {
    await Note.remove();
    await User.remove();
    testUser = await User.create(UserFactory.generate());
    testNote = await NoteFactory.generate();
  });
  test('Creating a note returns a status of 201', async () => {
    expect.assertions(6);
    try {
      const { body, status } = await mockRoute('create-note', `${ROOT}/`, testUser, testNote);
      expect(status).toEqual(201);
      expect(body.text).toEqual(testNote.text);
      expect(body.title).toEqual(testNote.title);
      expect(body.author.toString()).toEqual(testUser._id.toString());
      expect(body).toHaveProperty('_id');
      expect(body).toHaveProperty('createdAt');
    } catch (e) { throw e; };
  });
  test('Invalid JWT returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('invalid-jwt-post', `${ROOT}/`, testUser, testNote);
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
});
