import Joi from 'joi';

/**
 * Expected body object to compare user submitted data
 * against; allowing Joi to validate if the data matches
 * the criteria we have required for the data sets.
 */
export default {
  createNote: {
    body: {
      title: Joi.string().min(3).required(),
      text: Joi.string().required(),
    },
  },
};
