import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors'; // Assuming you have this or a similar error handling utility

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not a valid id`));
  }
  next();
};

export { isValidId };
