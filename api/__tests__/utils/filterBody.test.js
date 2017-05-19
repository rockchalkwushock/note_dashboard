import { filterBody } from '../../utils';

describe('filterBody()', () => {
  test.only('Returns ONLY whitelist keys on creating a user', () => {
    const body = {
      email: 'test@gmail.com',
      password: 'password1',
      maliciousKey: 'herpagonasyphylaids',
    };
    const whitelist = ['email', 'password'];
    expect(filterBody(body, whitelist).email).toEqual('test@gmail.com');
    expect(filterBody(body, whitelist).password).toEqual('password1');
    expect(filterBody(body, whitelist).maliciousKey).toEqual(undefined);
  })
});
