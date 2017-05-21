import HTTPStatus from 'http-status';

export const validateAuthorToUser = (req, res, note) => {
  if (note.author.toString() !== req.user._id.toString()) {
    return res.sendStatus(HTTPStatus.UNAUTHORIZED);
  };
};
