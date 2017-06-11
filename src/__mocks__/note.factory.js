import faker from 'faker'

class NoteFactory {
  /**
   * Create a note
   *
   * @public
   * @param {Object} attrs of note
   * @returns {Object} a fake note
   */
  generate(attrs) {
    return {
      text: faker.lorem.sentence(),
      title: faker.lorem.words(6),
      ...attrs
    }
  }
}

export default new NoteFactory()
