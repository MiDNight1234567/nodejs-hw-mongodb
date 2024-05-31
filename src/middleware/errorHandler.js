import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  //приховуємо попереждення від лінтеру щодо невикористованого доки що next
  if (next === 'fake') {
    next(err);
  }

  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
