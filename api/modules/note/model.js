/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title must be longer!'],
      unique: true
    },
    text: {
      type: String,
      required: [true, 'Some text are required!']
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Author is required!']
    }
  },
  { timestamps: true }
)

NoteSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!'
})

NoteSchema.statics = {
  /**
   * Create a note.
   *
   * @public
   * @param {Object} args - req.data object that contains title and text.
   * @param {String} userId - the user's id.
   * @returns {Object} note - new note create.
   */
  createNote(args, userId) {
    return this.create({
      ...args,
      author: userId
    })
  },
  /**
   * Generate a list of notes limiting it to 10.
   *
   * NOTE: You cannot match an object pattern against undefined,
   * because of this when using ES6 destructuring if no arguments
   * are passed to list() this will fail. That is why in the case
   * that there are no arguments passed we match against {}.
   *
   * Many thanks to @EQuimper for figuring this out!
   * Can be found at:
   * https://github.com/EQuimper/nodejs-api-boilerplate/blob/master/src/models/post.model.js#L74
   *
   * @param {Object} [{ skip = 0, limit = 10 }={}]
   * @returns {Array} notes - array of objects containing single notes.
   */
  list({ skip = 0, limit = 10 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author')
  }
}

NoteSchema.methods = {
  /**
   * Parse the note in format we want to send.
   *
   * @public
   * @returns {Object} Note Object
   */
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      author: this.author,
      createdAt: this.createdAt
    }
  }
}

let Note

try {
  Note = mongoose.model('notes')
} catch (e) {
  Note = mongoose.model('notes', NoteSchema)
}

export default Note
