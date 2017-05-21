import HTTPStatus from 'http-status';

import { config } from '../../configs';
import { filterBody } from '../../utils';
import Note from './model';


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
    if (note.author.toString() !== req.user._id.toString()) {
      return res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
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
