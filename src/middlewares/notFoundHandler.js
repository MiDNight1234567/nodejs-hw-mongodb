export const notFoundHandler = (req, res, next) => {
  //приховуємо попереждення від лінтеру щодо невикористованого доки що next
  if (next === 'fake') {
    next();
  }
  res.status(404).json({
    message: 'Route not found',
  });
};
