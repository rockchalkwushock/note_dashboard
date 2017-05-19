import Joi from 'joi';

/**
 * Expected body object to compare user submitted data
 * against; allowing Joi to validate if the data matches
 * the criteria we have required for the data sets.
 */
export default {
  signUp: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
    },
  },
};
