import HTTPStatus from 'http-status'

import { config } from '../../configs'
import { filterBody, validateAuthorToUser } from '../../utils'
import Note from './model'
import { User } from '../user'

/**
 * @api {post} /notes Create a note.
 * @apiDescription Create a note as a user.
 * @apiName createNote
 * @apiGroup Note
 *
 * @apiParam (Body) {String} title Note title.
 * @apiParam (Body) {String} text Note text.
 *
 * @apiHeader {Authorization} Authorization JWT Token.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} note Note created.
 * @apiSuccess {String} note._id Note id in database.
 * @apiSuccess {String} note.title Note title.
 * @apiSuccess {String} note.text Note text.
 * @apiSuccess {String} note.author Note author id.
 * @apiSuccess {String} note.createdAt Note creation date.
 *
 * @apiParam (Login) {String} pass Only logged in users have access.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio",
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * {
 *  _id: '123',
 *  title: 'A Cool Note',
 *  text: 'the coolest of notes!',
 *  createdAt: '2017-05-21',
 *  author: '8675309',
 * }
 *
 * @apiErrorExample {json} Unauthorized.
 *  HTTP/1.1 401 Unauthorized.
 */
export const createNote = async (req, res, next) => {
  const filteredBody = filterBody(req.body, config.WHITELIST.notes.create)
  try {
    const note = await Note.createNote(filteredBody, req.user._id)
    return res.status(HTTPStatus.CREATED).json(note)
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    /* istanbul ignore next */
    return next(e)
  }
}

/**
 * @api {patch} /notes/:id Edit a note.
 * @apiDescription Edit a note in user's group of notes.
 * @apiName editNote
 * @apiGroup Note
 *
 * @apiHeader {Authorization} Authorization JWT Token.
 *
 * @apiParam {String} id Note unique id.
 *
 * @apiParam (Body) {String} [title] Note title.
 * @apiParam (Body) {String} [text] Note text.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} note Note created.
 * @apiSuccess {String} note._id Note id in database.
 * @apiSuccess {String} note.title Note title.
 * @apiSuccess {String} note.text Note text.
 * @apiSuccess {String} note.author Note author id.
 * @apiSuccess {String} note.createdAt Note creation date.
 *
 * @apiParam (Login) {String} pass Only logged in users have access.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio",
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * {
 *  _id: '123',
 *  title: 'New title',
 *  text: 'New text',
 *  createdAt: '2017-05-21',
 *  author: '8675309',
 * }
 *
 * @apiErrorExample {json} Note not found.
 *  HTTP/1.1 404 Not Found.
 * @apiErrorExample {json} Unauthorized.
 *  HTTP/1.1 401 Unauthorized.
 */
export const editNote = async (req, res, next) => {
  const filteredBody = filterBody(req.body, config.WHITELIST.notes.update)
  try {
    const note = await Note.findById(req.params.id)
    validateAuthorToUser(req, res, note)
    Object.keys(filteredBody).forEach(key => {
      note[key] = filteredBody[key]
    })
    const updatedNote = await note.save()
    return res.status(HTTPStatus.OK).json(updatedNote)
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    /* istanbul ignore next */
    return next(e)
  }
}

/**
 * @api {delete} /notes/:id Delete a note.
 * @apiDescription Delete a note in user's group of notes.
 * @apiName deleteNote
 * @apiGroup Note
 *
 * @apiHeader {Authorization} Authorization JWT Token.
 *
 * @apiParam {String} id Note unique id.
 *
 * @apiParam (Login) {String} pass Only logged in users have access.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio",
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * 200
 *
 * @apiErrorExample {json} Note not found.
 *  HTTP/1.1 404 Not Found.
 * @apiErrorExample {json} Unauthorized.
 *  HTTP/1.1 401 Unauthorized.
 */
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)
    validateAuthorToUser(req, res, note)
    await note.remove()
    return res.sendStatus(HTTPStatus.OK)
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    /* istanbul ignore next */
    return next(e)
  }
}

/**
 * @api {get} /notes/:id Fetch a single note.
 * @apiDescription Get a note in user's group of notes.
 * @apiName getNote
 * @apiGroup Note
 *
 * @apiHeader {Authorization} Authorization JWT Token.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object} note Note created.
 * @apiSuccess {String} note._id Note id in database.
 * @apiSuccess {String} note.title Note title.
 * @apiSuccess {String} note.text Note text.
 * @apiSuccess {Object} note.author Note author.
 * @apiSuccess {String} note.author._id Note author id.
 * @apiSuccess {String} note.createdAt Note creation date.
 *
 * @apiParam (Login) {String} pass Only logged in users have access.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio",
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * {
 *  _id: '123',
 *  title: 'New title',
 *  text: 'New text',
 *  createdAt: '2017-05-21',
 *  author: {
 *   _id: '8675309',
 *  },
 * }
 *
 * @apiErrorExample {json} Note not found.
 *  HTTP/1.1 404 Not Found.
 * @apiErrorExample {json} Unauthorized.
 *  HTTP/1.1 401 Unauthorized.
 */
export const noteById = async (req, res, next) => {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Note.findById(req.params.id).populate('author')
    ])
    return res.status(HTTPStatus.OK).json({ ...promise[1].toJSON() })
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    /* istanbul ignore next */
    return next(e)
  }
}

/**
 * @api {get} /notes Fetch all notes.
 * @apiDescription Get all the notes in a user's group of notes.
 * @apiName getListOfNotes
 * @apiGroup Note
 *
 * @apiHeader {Authorization} Authorization JWT Token.
 *
 * @apiParam (query) {Int} skip Number of skip notes.
 * @apiParam (query) {Int} limit Maximum number of notes.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Object[]} note List of notes.
 * @apiSuccess {String} note._id Note id in database.
 * @apiSuccess {String} note.title Note title.
 * @apiSuccess {String} note.text Note text.
 * @apiSuccess {Object} note.author Note author.
 * @apiSuccess {String} note.author._id Note author id.
 * @apiSuccess {String} note.createdAt Note creation date.
 *
 * @apiParam (Login) {String} pass Only logged in users have access.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio",
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 0K
 *
 * [
 *  {
 *   _id: '123',
 *   title: 'New title',
 *   text: 'New text',
 *   createdAt: '2017-05-21',
 *   author: {
 *    _id: '8675309',
 *   }
 *  },
 *  {
 *   _id: '1234',
 *   title: 'New title',
 *   text: 'New text',
 *   createdAt: '2017-05-20',
 *   author: {
 *    _id:'8675309',
 *   }
 *  },
 *  ...
 * ]
 *
 *
 * @apiErrorExample {json} Notes not found.
 *  HTTP/1.1 404 Not Found.
 * @apiErrorExample {json} Unauthorized.
 *  HTTP/1.1 401 Unauthorized.
 */
export const allNotes = async (req, res, next) => {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Note.list({ skip: req.query.skip, limit: req.query.limit })
    ])
    const notes = promise[1].reduce((arr, note) => {
      arr.push({ ...note.toJSON() })
      return arr
    }, [])
    return res.status(HTTPStatus.OK).json(notes)
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    /* istanbul ignore next */
    return next(e)
  }
}
