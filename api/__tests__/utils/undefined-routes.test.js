import mongoose from 'mongoose';

import { mockRoute } from '../../__mocks__';
import { config } from '../../configs';
import server from '../../';

const endpoint = `${config.ENDPOINT}/not-a-route`;

describe('GET: /*', () => {
  test('Returns 404 when going to an undefined route', async () => {
    expect.assertions(2);
    try {
      const { body, status } = await mockRoute('*', endpoint, null);
      expect(status).toEqual(404);
      expect(body.message).toEqual('Not Found!');
    } catch (e) { throw e; };
  });
  afterAll(async () => {
    try {
      await mongoose.disconnect();
      await server.close();
    } catch (e) { throw e; };
  })
})
