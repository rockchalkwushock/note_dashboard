import { filterBody } from '../../utils';

describe('filterBody()', () => {
  test('Returns ONLY whitelist keys on creating a user', () => {
    const body = {
      email: 'test@gmail.com',
      password: 'password1',
      maliciousKey: 'herpagonasyphylaids',
    };
    const whitelist = ['email', 'password'];
    expect(filterBody(body, whitelist).email).toEqual('test@gmail.com');
    expect(filterBody(body, whitelist).password).toEqual('password1');
    expect(filterBody(body, whitelist).maliciousKey).toEqual(undefined);
  });
  test('Returns ONLY whitelist keys on creating a note', () => {
    const body = {
      maliciousKey: 'herpagonasyphylaids',
      text: 'We are herpagonasyphylaids free!',
      title: 'STD Awareness Week',
    };
    const whitelist = ['text', 'title'];
    expect(filterBody(body, whitelist).text).toEqual('We are herpagonasyphylaids free!');
    expect(filterBody(body, whitelist).title).toEqual('STD Awareness Week');
    expect(filterBody(body, whitelist).maliciousKey).toEqual(undefined);
  })
});
