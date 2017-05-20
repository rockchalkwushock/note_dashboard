/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';

import { mockRoute, NoteFactory, UserFactory } from '../../__mocks__';
import { Note, User } from '../../modules';
import { config } from '../../configs';
import server from '../../';

// Store endpoint that will be tested.
const ROOT = `${config.ENDPOINT}/notes`;
const endPoint1 = '/new-note';
let testUser;
let testNote;

describe('Note Module Routes', () => {
  /**
   * Before any tests are ran clear the database
   * of all notes & users. Then populate a testUser.
   */
  beforeAll(async () => {
    await Note.remove();
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });
  // Before each test is ran populate a testNote.
  beforeEach(() => { testNote = NoteFactory.generate(); });
  describe(`POST: ${endPoint1}`, () => {
    describe('SUCCESSFUL REQUEST', () => {
      test('Creating a note returns a status of 201', async () => {
        expect.assertions(6);
        try {
          const { body, status } = await mockRoute(`${endPoint1}`, `${ROOT}${endPoint1}`, testUser, testNote);
          expect(status).toEqual(201);
          expect(body.text).toEqual(testNote.text);
          expect(body.title).toEqual(testNote.title);
          expect(body.author.toString()).toEqual(testUser._id.toString());
          expect(body).toHaveProperty('_id');
          expect(body).toHaveProperty('createdAt');
        } catch (e) { throw e; };
      });
    });
  });
  afterAll(async () => {
    const { notes, users } = mongoose.connection.collections;
    try {
      await notes.drop(); // drop the notes collection
      await users.drop(); // drop the users collection
      await mongoose.disconnect(); // close connection to MongoDB
      await server.close(); // close server connection
    } catch (e) { throw e; };
  })
});
