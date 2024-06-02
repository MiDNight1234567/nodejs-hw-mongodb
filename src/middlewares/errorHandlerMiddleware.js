export const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(500).send('Not found122!');
};
