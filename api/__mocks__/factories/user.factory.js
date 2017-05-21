import faker from 'faker';

class UserFactory {
  /**
   * Create a user
   *
   * @public
   * @param {Object} attrs of user
   * @returns {Object} a fake user
   */
  generate(attrs) {
    return {
      email: faker.internet.email(),
      password: 'password1',
      ...attrs,
    };
  }
}

export default new UserFactory();
