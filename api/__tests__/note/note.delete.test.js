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

describe('DELETE: /notes/:id', () => {
  /**
   * Before any tests are ran clear the database
   * of all notes & users.
   * Then populate testUsers & testNotes for assertions.
   */
  beforeAll(async () => {
    await Note.remove();
    await User.remove();
    testUser = await User.create(UserFactory.generate());
    testNote = await Note.create(NoteFactory.generate({ author: testUser._id }));
    testUser2 = await User.create(UserFactory.generate());
    testNote2 = await Note.create(NoteFactory.generate({ author: testUser._id }));
  });
  test('Deleting a note returns a status of 200', async () => {
    expect.assertions(1);
    try {
      const { status } = await mockRoute('delete-note', `${ROOT}/${testNote._id}`, testUser, null);
      expect(status).toEqual(200);
    } catch (e) { throw e; }
  });
  test('Invalid JWT returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('invalid-jwt-delete', `${ROOT}/${testNote._id}`, testUser, null);
      expect(status).toEqual(401);
      expect(text).toEqual('Unauthorized');
    } catch (e) { throw e; }
  });
  test('Deleting note that does not belong to user returns status of 401', async () => {
    expect.assertions(2);
    try {
      const { status, text } = await mockRoute('delete-note', `${ROOT}/${testNote2._id}`, testUser2, null);
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
