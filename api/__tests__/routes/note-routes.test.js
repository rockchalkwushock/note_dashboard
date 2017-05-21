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
  describe('POST: /notes/', () => {
    describe('SUCCESSFUL REQUEST', () => {
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
    });
    describe('FAILED REQUEST', () => {
      test('Invalid JWT returns status of 401', async () => {
        expect.assertions(2);
        try {
          const { status, text } = await mockRoute('invalid-jwt-post', `${ROOT}/`, testUser, testNote);
          expect(status).toEqual(401);
          expect(text).toEqual('Unauthorized');
        } catch (e) { throw e; }
      });
    });
  });
  describe('PATCH: /notes/:id', () => {
    describe('SUCCESSFUL REQUEST', () => {
      beforeEach(async () => {
        testUser2 = await User.create(UserFactory.generate());
        testNote = await Note.create(NoteFactory.generate({ author: testUser2._id }));
        testNote2 = await Note.create(NoteFactory.generate({ author: testUser2._id }));
      });
      test('Updating a note returns a status of 200', async () => {
        expect.assertions(6);
        try {
          const { body, status } = await mockRoute('update-note', `${ROOT}/${testNote._id}`, testUser2, { title: 'GraphQL would have been easier' });
          expect(status).toEqual(200);
          expect(body.title).toEqual('GraphQL would have been easier');
          expect(body.text).toEqual(testNote.text);
          expect(body._id).toEqual(testNote._id.toString());
          expect(body.author).toEqual(testNote.author.toString());
          expect(body).toHaveProperty('createdAt');
        } catch (e) { throw e; }
      })
    });
    describe('FAILED REQUEST', () => {
      test('Invalid JWT returns status of 401', async () => {
        expect.assertions(2);
        try {
          const { status, text } = await mockRoute('invalid-jwt-patch', `${ROOT}/${testNote2._id}`, testUser, { title: 'GraphQL would have been easier' });
          expect(status).toEqual(401);
          expect(text).toEqual('Unauthorized');
        } catch (e) { throw e; }
      })
      test('Updating note that does not belong to user returns status of 401', async () => {
        expect.assertions(2);
        try {
          const { status, text } = await await mockRoute('update-note', `${ROOT}/${testNote2._id}`, testUser, { title: 'GraphQL would have been easier' });
          expect(status).toEqual(401);
          expect(text).toEqual('Unauthorized');
        } catch (e) { throw e; }
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
