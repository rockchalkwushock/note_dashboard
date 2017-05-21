import HTTPStatus from 'http-status';

import { config } from '../../configs';
import { filterBody, validateAuthorToUser } from '../../utils';
import Note from './model';
import { User } from '../user';


export const createNote = async (req, res, next) => {
  const filteredBody = filterBody(req.body, config.WHITELIST.notes.create);
  try {
    const note = await Note.createNote(filteredBody, req.user._id);
    return res.status(HTTPStatus.CREATED).json(note);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const editNote = async (req, res, next) => {
  const filteredBody = filterBody(req.body, config.WHITELIST.notes.update);
  try {
    const note = await Note.findById(req.params.id);
    validateAuthorToUser(req, res, note);
    Object.keys(filteredBody).forEach(key => {
      note[key] = filteredBody[key];
    });
    const updatedNote = await note.save();
    return res.status(HTTPStatus.OK).json(updatedNote);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    validateAuthorToUser(req, res, note);
    await note.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const noteById = async (req, res, next) => {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Note.findById(req.params.id).populate('author'),
    ]);
    return res.status(HTTPStatus.OK).json({ ...promise[1].toJSON() });
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const allNotes = async (req, res, next) => {
  try {
    const promise = await Promise.all([
      User.findById(req.user._id),
      Note.list({ skip: req.query.skip, limit: req.query.limit })
    ]);
    const notes = promise[1].reduce((arr, note) => {
      arr.push({ ...note.toJSON() });
      return arr;
    }, []);
    return res.status(HTTPStatus.OK).json(notes);
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}
